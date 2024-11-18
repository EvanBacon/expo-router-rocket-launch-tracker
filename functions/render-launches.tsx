import Link from "expo-router/link";

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return {
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    relative: getRelativeTime(date),
  };
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (diff < 0) return "Launched";
  if (days > 0) return `T-${days}d ${hours}h`;
  if (hours > 0) return `T-${hours}h ${minutes}m`;
  return `T-${minutes}m`;
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

export async function renderUpcomingLaunches() {
  const API_URL =
    "https://lldev.thespacedevs.com/2.2.0/launch/upcoming?limit=10&ordering=net";

  try {
    const response = await fetch(API_URL, {});

    if (!response.ok) {
      throw new Error("Failed to fetch launch data");
    }

    const data = (await response.json()) as ApiResponse;

    if (!data.results || data.results.length === 0) {
      throw new Error("No upcoming launches found");
    }

    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Upcoming Launches
        </h1>

        <div className="space-y-6">
          {data.results.map((launch) => {
            const date = formatDateString(launch.net);

            return (
              <Link
                href={`/launch/${launch.id}`}
                key={launch.id}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
                  <div className="sm:flex">
                    {/* Image Section */}
                    <div className="sm:w-48 h-48 sm:h-auto relative">
                      {launch.image ? (
                        <img
                          src={launch.image}
                          alt={launch.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            launch.status.name
                          )}`}
                        >
                          {launch.status.name}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {launch.name}
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            {launch.launch_service_provider.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            {date.relative}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {date.time}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-gray-600 line-clamp-2">
                          {launch.mission?.description ||
                            "Mission details pending."}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
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
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                            </svg>
                            {launch.pad.name}
                          </div>
                          {launch.mission?.orbit && (
                            <div className="flex items-center text-sm text-gray-500">
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
                                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                                />
                              </svg>
                              {launch.mission.orbit.name}
                            </div>
                          )}
                        </div>
                        {launch.webcast_live && (
                          <div className="flex items-center text-green-600">
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
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-sm">Live</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Section Placeholder */}
        <div className="mt-8 flex justify-center">
          <p className="text-sm text-gray-500">
            Showing {data.results.length} of {data.count} launches
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
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
            Error Loading Launches
          </h2>
          <p className="text-red-600">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }
}
