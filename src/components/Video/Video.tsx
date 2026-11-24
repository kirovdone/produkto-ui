"use client";

import { PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../cn";
import { useTranslate } from "../../host";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../Dialog";
import { Icon } from "../Icon";
import { Image } from "../Image";
import {
  videoClasses,
  videoDialogClasses,
  videoGroundClasses,
  videoMediaClasses,
  videoPlayClasses,
  videoToggleClasses,
} from "./Video.classes";
import type { VideoProps } from "./Video.types";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const IN_VIEW = 0.3;

const Ground = ({ src, poster, alt, className }: VideoProps) => {
  const t = useTranslate();
  const ref = useRef<HTMLVideoElement>(null);
  const held = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia(REDUCED_MOTION).matches) return;
    element.muted = true;
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) element.pause();
        else if (!held.current) element.play().catch(() => {});
      },
      { threshold: IN_VIEW },
    );
    watcher.observe(element);
    return () => watcher.disconnect();
  }, []);

  const toggle = () => {
    const element = ref.current;
    if (!element) return;
    held.current = playing;
    if (playing) element.pause();
    else element.play().catch(() => {});
  };

  return (
    <div
      data-part="video"
      data-mode="ground"
      className={cn(videoGroundClasses, className)}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={videoMediaClasses}
      />
      <button
        type="button"
        data-part="video-toggle"
        aria-label={playing ? t("Pause the film") : t("Play the film")}
        onClick={toggle}
        className={videoToggleClasses}
      >
        <Icon icon={playing ? PauseIcon : PlayIcon} />
      </button>
    </div>
  );
};

const InPage = ({ src, poster, alt, borderRadius, className }: VideoProps) => {
  const t = useTranslate();
  const [started, setStarted] = useState(false);
  return (
    <div
      data-part="video"
      data-mode="page"
      data-radius={borderRadius}
      className={cn(videoClasses({ borderRadius }), className)}
    >
      {started ? (
        <video
          src={src}
          poster={poster}
          aria-label={alt}
          controls
          autoPlay
          playsInline
          className={videoMediaClasses}
        />
      ) : (
        <>
          <Image src={poster} alt={alt} className={videoMediaClasses} />
          <button
            type="button"
            data-part="video-play"
            aria-label={t("Play the film")}
            onClick={() => setStarted(true)}
            className={videoPlayClasses}
          >
            <Icon icon={PlayIcon} />
          </button>
        </>
      )}
    </div>
  );
};

const Large = ({ src, poster, alt, borderRadius, className }: VideoProps) => {
  const t = useTranslate();
  return (
    <Dialog>
      <div
        data-part="video"
        data-mode="large"
        data-radius={borderRadius}
        className={cn(videoClasses({ borderRadius }), className)}
      >
        <Image src={poster} alt={alt} className={videoMediaClasses} />
        <DialogTrigger asChild>
          <button
            type="button"
            data-part="video-play"
            aria-label={t("Play the film")}
            className={videoPlayClasses}
          >
            <Icon icon={PlayIcon} />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className={videoDialogClasses}>
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <video
          src={src}
          aria-label={alt}
          controls
          autoPlay
          playsInline
          className={videoMediaClasses}
        />
      </DialogContent>
    </Dialog>
  );
};

export const Video = ({
  mode = "page",
  borderRadius = "xl",
  ...props
}: VideoProps) =>
  mode === "ground" ? (
    <Ground {...props} />
  ) : mode === "large" ? (
    <Large {...props} borderRadius={borderRadius} />
  ) : (
    <InPage {...props} borderRadius={borderRadius} />
  );
