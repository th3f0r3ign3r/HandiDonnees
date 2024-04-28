import App from './app';
import logger from './core/utils/logger';
import AuthRouter from './features/auth/auth.route';
import UserRouter from './features/user/user.route';
import PersonRouter from './features/person/person.route';
import RegionRouter from './features/region/region.route';
import DisabilityRouter from './features/disability/disability.route';
import ArticleCategoryRouter from './features/article-category/article.category.route';
import ArticleRouter from './features/article/article.route';
import DisabilityHistoryRouter from './features/disability-history/disability.history.route';
import JobOfferRouter from './features/job-offer/job.offer.route';
import RegistrationRequestRouter from './features/registration-request/registration.request.route';

const app = new App([
    new UserRouter('/v1/users'),
    new PersonRouter('/v1/persons'),
    new DisabilityRouter('/v1/disabilities'),
    new RegionRouter('/v1/regions'),
    new ArticleCategoryRouter('/v1/article-categories'),
    new ArticleRouter('/v1/articles'),
    new DisabilityHistoryRouter('/v1/disability-histories'),
    new JobOfferRouter('/v1/job-offers'),
    new RegistrationRequestRouter('/v1/registration-requests'),
    new AuthRouter('/v1/auth'),
]);
app.bootstrap();

const exitHandler = () => {
    if (app.server)
        app.server.close(() => {
            logger.info('ℹ️ Server closed');
            process.exit(1);
        });
    else process.exit(1);
};

process.on('unhandledRejection', (error) => {
    logger.error(`🌋 UNHANDLED REJECTION! 💥 Shutting down...\n\n ${error}`);
    exitHandler();
});

process.on('SIGTERM', () => {
    logger.info('ℹ️ SIGTERM received. Shutting down gracefully');
    if (app.server) app.server.close(() => logger.info('💥 Process terminated!'));
});
