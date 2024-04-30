const stats = [
  {
    name: "Personnes Handicapées",
    stat: "71 897",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Demandes d'accès",
    stat: "12",
    change: "2.02%",
    changeType: "increase",
  },
  {
    name: "Données téléchargées",
    stat: "3214",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
];

export default function Page() {
  return (
    <div>
      <h1 className="text-5xl font-bold tracking-tighter">
        Bonjour, <br /> M. Jean ALLAGBE
      </h1>

      <section className="mt-14">
        {/* <h3 className="text-base font-semibold leading-6 text-gray-900">
            Last 30 days
          </h3> */}
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">
                {item.name}
              </dt>
              <dd className="mt-3 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-4xl font-bold text-blue-600 tracking-tighter">
                  {item.stat}
                </div>

                {/* <div
                  className={classNames(
                    item.changeType === "increase"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                    "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {" "}
                    {item.changeType === "increase"
                      ? "Increased"
                      : "Decreased"}{" "}
                    by{" "}
                  </span>
                  {item.change}
                </div> */}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
