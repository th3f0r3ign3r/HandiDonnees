const people = [
  {
    name: "Lindsay Walton",
    birthdate: "1970-01-01",
    npi: "1234567890",
    handicap: "Autisme",
  },
  {
    name: "John Doe",
    birthdate: "1985-05-10",
    npi: "0987654321",
    handicap: "Surdité",
  },
  {
    name: "Jane Smith",
    birthdate: "1990-12-15",
    npi: "2468135790",
    handicap: "Paraplégie",
  },
  {
    name: "Alexandre Dupont",
    birthdate: "1978-07-20",
    npi: "1357924680",
    handicap: "Malvoyance",
  },
  {
    name: "Sophie Martin",
    birthdate: "1982-03-25",
    npi: "8642097531",
    handicap: "Trouble de l'élocution",
  },
  {
    name: "Thomas Dubois",
    birthdate: "1995-09-05",
    npi: "7531908642",
    handicap: "Handicap mental",
  },
  {
    name: "Camille Rousseau",
    birthdate: "1989-11-30",
    npi: "0123456789",
    handicap: "Handicap moteur",
  },
  {
    name: "Lucie Lefebvre",
    birthdate: "1987-06-15",
    npi: "9876543210",
    handicap: "Trouble du spectre de l'autisme",
  },
  {
    name: "Gabriel Mercier",
    birthdate: "1993-02-10",
    npi: "3692581470",
    handicap: "Handicap visuel",
  },
  {
    name: "Emma Gagnon",
    birthdate: "1984-08-25",
    npi: "7418529630",
    handicap: "Handicap auditif",
  },
  {
    name: "Louis Tremblay",
    birthdate: "1998-04-20",
    npi: "2581473690",
    handicap: "Handicap intellectuel",
  },
];

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter">
        Répertoire des utilisateurs
      </h1>
      <p className="mt-2">
        Vous pouvez voir la liste de tous les personnes Handicapées inscrites
        sur la plateforme.
      </p>

      <section className="mt-10">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date de naissance
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        NPI
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Handicap
                      </th>
                      {/* <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.npi}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.birthdate}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.npi.slice(0, 3)}******************
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.handicap}
                        </td>
                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
