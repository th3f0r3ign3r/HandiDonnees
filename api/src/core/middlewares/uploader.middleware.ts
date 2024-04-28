import multer from 'multer';
import fs from 'fs';
import path from 'path';
import httpStatus from 'http-status';
import { NextFunction, Request } from 'express';

import ApiError from '../utils/api_error';

/**
 * Get a multer storage engine for the upload {multer}
 */
const getStorage = (destination: string) => {
    // Check if the directory exists and create it if it doesn't
    if (!fs.existsSync(`public/uploads/${destination}`)) {
        fs.mkdirSync(`public/uploads/${destination}`, { recursive: true });
    }

    // An MulterStorage object
    return multer.diskStorage({
        // Where to upload the files
        destination: (_req, _file, cb) => cb(null, `public/uploads/${destination}`),

        // What will be the final uploaded file name: timestamp + file extension
        filename(req, file, cb) {
            const fileExtension = path.extname(file.originalname);
            const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
            const filename = `${uniqueSuffix + fileExtension}`;
            cb(null, filename);
        },
    });
};

/**
 * Get the multer file filter function {multer}
 */
const getFileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, accept: boolean) => void
) => {
    // Check if the uploaded file is an image (JPEG, PNG, GIF) or an Excel file (XLSX,XLS)
    const allowedFileExtension = /jpeg|jpg|png|webp|gif|xlsx/i;
    const allowedFileMimeType =
        /jpeg|png|webp|gif|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet/i;
    const extname = allowedFileExtension.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileMimeType.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Accept the file
    }
    return cb(
        new ApiError(
            httpStatus.BAD_REQUEST,
            'Only jpeg, png, bmp, tiff, gif images  and xlsx, xls excel files are supported from now'
        ),
        false
    );
};

/**
 * Get only the multer upload middleware {multer}
 * Can be used in combination with the getStorage function
 * @param {multer.StorageEngine} storage - The multer storage engine
 * @param {Object} limits - The multer limits options.
 *
 * @returns multer.Multer
 */
const getUploader = (
    storage: multer.StorageEngine,
    limits = { fieldSize: 1e8, fileSize: 1e7, files: 1 }
) => {
    // Return the multer upload middleware
    return multer({
        storage,
        fileFilter: getFileFilter,
        limits,
    });
};

/**
 * Get destination folder and limits options in order to upload files
 * @param {String} destination Where to upload the files.
 * @param {Object} limits Multer limits options
 * @returns multer.Multer The multer upload middleware
 */
const uploader = (destination: string, limits = { fieldSize: 1e8, fileSize: 1e7, files: 1 }) => {
    // Get the multer storage engine
    const storage = getStorage(destination);

    // Return the multer upload middleware
    return multer({
        storage,
        fileFilter: getFileFilter,
        limits,
    });
};

/**
 * Update the req.body with the file path for a single file field in the request
 */
const updateSingFileleField =
    (fieldName: string, destination: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            req.body[fieldName] = `/uploads/${destination}/${req.file.filename}`;
        }

        next();
    };

/**
 *
 * Update the req.body with the file path when mixing single file an array of files
 * @param {[Object]} fields {fieldName, destination}
 *
 * Required fields:
 *
 * fieldName: The name of the field in the request
 *
 * destination: The directory name in the public/uploads folder
 *
 * e.g. [{fieldName: 'photos', destination: 'assets'}]
 *
 *
 * @returns (req, res, next)
 */
const updateMixedFileFields =
    (fields: { fieldName: string; destination: string }[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        // Loop through the fields only if the req.files is not empty
        if (req.files) {
            fields.forEach((field) => {
                if (
                    (
                        req.files as {
                            [fieldname: string]: Express.Multer.File[];
                        }
                    )[field.fieldName]
                ) {
                    // Check if the field is an array of files then update the req.body
                    if (
                        Array.isArray(
                            (
                                req.files as {
                                    [fieldname: string]: Express.Multer.File[];
                                }
                            )[field.fieldName]
                        )
                    ) {
                        req.body[field.fieldName] =
                            `/uploads/${field.destination}/${(req.files as { [fieldname: string]: Express.Multer.File[] })[field.fieldName][0].filename}`;
                    }
                }
            });
        }

        next();
    };

module.exports = {
    uploader,
    getUploader,
    getStorage,
    updateSingFileleField,
    updateMixedFileFields,
};
