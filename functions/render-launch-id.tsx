import Link from "expo-router/link";

function formatCountdown(launchDate: Date) {
  const now = new Date();
  const diff = launchDate.getTime() - now.getTime();

  if (diff < 0) return "Launch has occurred";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `T-${days}d ${hours}h ${minutes}m`;
}

function getStatusColor(status: string) {
  const statusColors = {
    Go: "bg-green-100 text-green-800 border-green-200",
    TBD: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Hold: "bg-red-100 text-red-800 border-red-200",
    Success: "bg-blue-100 text-blue-800 border-blue-200",
    Failure: "bg-red-100 text-red-800 border-red-200",
    "In Flight": "bg-purple-100 text-purple-800 border-purple-200",
    "Launch Successful": "bg-blue-100 text-blue-800 border-blue-200",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200";
}

export async function renderLaunchDetail({ id }: { id: string }) {
  const API_URL = `https://lldev.thespacedevs.com/2.2.0/launch/${id}`;

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch launch data");
    }

    const launch = (await response.json()) as Launch;
    const launchDate = new Date(launch.net);
    const countdown = formatCountdown(launchDate);

    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64 sm:h-96">
            {launch.image ? (
              <img
                src={launch.image}
                alt={launch.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    launch.status.name
                  )}`}
                >
                  {launch.status.name}
                </span>
                {launch.webcast_live && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    Live
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold">{launch.name}</h1>
              <p className="text-gray-200 mt-2">
                {launch.launch_service_provider.name}
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">TIME TO LAUNCH</p>
              <p className="text-3xl font-bold text-blue-900">{countdown}</p>
              <p className="text-sm text-gray-600 mt-2">
                {launchDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at{" "}
                {launchDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Mission Description */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Mission Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {launch.mission?.description ||
                  "Mission details are not yet available."}
              </p>
            </section>

            {/* Key Details Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Launch Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Launch Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-1 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Vehicle</p>
                      <p className="text-gray-600">
                        {launch.rocket.configuration.full_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-1 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Launch Site</p>
                      <p className="text-gray-600">{launch.pad.name}</p>
                      <p className="text-sm text-gray-500">
                        {launch.pad.location.name}
                      </p>
                    </div>
                  </div>

                  {launch.mission?.orbit && (
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 text-gray-400 mt-1 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">
                          Target Orbit
                        </p>
                        <p className="text-gray-600">
                          {launch.mission.orbit.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Launch Provider Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Launch Provider
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-1 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Provider</p>
                      <p className="text-gray-600">
                        {launch.launch_service_provider.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mt-1 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Mission Type</p>
                      <p className="text-gray-600">
                        {launch.mission?.type || "Unknown"}
                      </p>
                    </div>
                  </div>

                  {launch.probability !== null && (
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 text-gray-400 mt-1 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">
                          Launch Probability
                        </p>
                        <p className="text-gray-600">{launch.probability}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Program Information */}
            {launch.program && launch.program.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Program Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {launch.program.map((program) => (
                    <div key={program.id} className="space-y-2">
                      <h4 className="font-medium text-gray-900">
                        {program.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {program.description}
                      </p>
                      {program.wiki_url && (
                        <a
                          href={program.wiki_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                        >
                          Learn more
                          <svg
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Updates Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Launch Updates
                </h3>
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(launch.last_updated).toLocaleString()}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Status: {launch.status.description}
                  </p>
                  {launch.holdreason && (
                    <p className="text-sm text-yellow-600">
                      Hold Reason: {launch.holdreason}
                    </p>
                  )}
                  {launch.failreason && (
                    <p className="text-sm text-red-600">
                      Failure Reason: {launch.failreason}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Webcast Section */}
            {launch.webcast_live && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Live Webcast
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                    <div className="relative">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="font-medium">Live Now</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    The official webcast for this launch is currently live.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Watch Webcast
                    <svg
                      className="ml-2 -mr-1 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </section>
            )}

            {/* Launch Window */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Launch Window
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Window Start</p>
                  <p className="font-medium text-gray-900">
                    {new Date(launch.window_start).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Window End</p>
                  <p className="font-medium text-gray-900">
                    {new Date(launch.window_end).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Precision</p>
                  <p className="font-medium text-gray-900">
                    {launch.net_precision.name}
                  </p>
                </div>
              </div>
            </section>

            {/* Launch Statistics */}
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Launch Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">
                    #{launch.pad_launch_attempt_count}
                  </p>
                  <p className="text-sm text-gray-500">Pad Launch</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">
                    #{launch.location_launch_attempt_count}
                  </p>
                  <p className="text-sm text-gray-500">Location Launch</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">
                    #{launch.agency_launch_attempt_count}
                  </p>
                  <p className="text-sm text-gray-500">Agency Launch</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">
                    #{launch.pad_launch_attempt_count_year}
                  </p>
                  <p className="text-sm text-gray-500">This Year</p>
                </div>
              </div>
            </section>

            {/* Related Links */}
            <section className="border-t border-gray-100 pt-8">
              <div className="flex flex-wrap gap-4">
                {launch.pad.wiki_url && (
                  <a
                    href={launch.pad.wiki_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Launch Site Wiki
                  </a>
                )}
                {launch.launch_service_provider.info_url && (
                  <a
                    href={launch.launch_service_provider.info_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Provider Info
                  </a>
                )}
                {launch.mission?.info_urls?.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Mission Info {index + 1}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg
            className="h-5 w-5 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Launches
        </Link>

        <div className="bg-red-50 rounded-xl p-6 text-center">
          <svg
            className="h-12 w-12 mx-auto text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Launch Details
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
