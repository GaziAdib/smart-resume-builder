"use client";

import SkeletonLoader from './SkeletonLoader'

const SkeletonCard = () => {
  return (
    <div className="bg-gray-50 text-zinc-800 w-full h-full hover:bg-gray-800 hover:text-gray-200 hover:border-green-200 hover:transition border-gray-200 rounded-lg p-6 mb-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="text-sm font-semibold"> {/* Skeleton loader for Module label */}
        <SkeletonLoader width="100px" height="10px" />
      </div>
      <div className="text-sm"> {/* Skeleton loader for Module title */}
        <SkeletonLoader width="150px" height="10px" />
      </div>

      <div className="text-sm font-medium"> {/* Skeleton loader for Assignment type label */}
        <SkeletonLoader width="100px" height="10px" />
      </div>
      <div className="text-sm"> {/* Skeleton loader for Assignment type */}
        <SkeletonLoader width="150px" height="10px" />
      </div>

      <div className="text-sm font-semibold"> {/* Skeleton loader for Submission label */}
        <SkeletonLoader width="100px" height="10px" />
      </div>
      <div className="text-sm"> {/* Skeleton loader for Submission title */}
        <SkeletonLoader width="150px" height="10px" />
      </div>

      <div className="text-sm font-semibold"> {/* Skeleton loader for Submitted By label */}
        <SkeletonLoader width="100px" height="10px" />
      </div>
      <div className="text-sm"> {/* Skeleton loader for Submitted By */}
        <SkeletonLoader width="150px" height="10px" />
      </div>

      <div className="text-sm font-semibold"> {/* Skeleton loader for Submitted At label */}
        <SkeletonLoader width="100px" height="10px" />
      </div>
      <div className="text-sm"> {/* Skeleton loader for Submitted At */}
        <SkeletonLoader width="150px" height="10px" />
      </div>
    </div>

    <div className="col-span-2 mt-5 py-3 flex-row justify-center">
      {/* Skeleton loader for Feedback button */}
      <SkeletonLoader width="200px" height="40px" />
    </div>
  </div>
  )
}

export default SkeletonCard