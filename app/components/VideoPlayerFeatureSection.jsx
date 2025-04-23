

"use client";
import { useState, useRef } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';

export default function VideoPlayerFeatureSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null)

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Complete Video Roadmap
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Watch how our Smart Resume Builder Platform Manages Everything For you.
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-2xl border-4 border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-xl aspect-video mx-auto">
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          poster="https://pbs.twimg.com/media/GpPPbSQasAETDWP?format=png&name=900x900"
        >
          <source src="/assets/videos/project_roadmap.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause button */}
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center w-full h-full group"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm group-hover:bg-white dark:group-hover:bg-gray-800 transition-all">
            {isPlaying ? (
              <FiPause className="w-8 h-8 text-gray-900 dark:text-white" />
            ) : (
              <FiPlay className="w-8 h-8 text-gray-900 dark:text-white ml-1" />
            )}
          </div>
        </button>

        {/* Video controls bar (optional) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent flex items-end pb-4 px-4">
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1.5">
            <div 
              className="bg-white dark:bg-indigo-400 h-1.5 rounded-full" 
              style={{ width: videoRef.current ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Feature highlights that appear during video playback */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Realtime Customization",
            desc: "Our AI handles repetitive tasks so you can focus on what matters"
          },
          {
            title: "Draggable Sections",
            desc: "Get instant insights with our powerful dashboard"
          },
          {
            title: "PDF Generation & Data Control",
            desc: "Work together effortlessly with built-in team features"
          }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}