import type { Course } from "./types";

const firstVideoByPlaylist: Record<string, string> = {
  "PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0": "S9uPNppGsGo",
  "PLcoYAcR89n-qbO7YAVj5S0alABLis_QVU": "2c7yWlpWDJM",
  "PLbIBj8vQhvm2WT-pjGS5x7zUzmh4VgvRk": "lHYV_H1526Q",
  "PL3Fmwz_E1hXRWxIkP843DiDf0ZeqgftTy": "5kepfx0RquY",
  "PLyqOvdQmGdTR46HUxDA6Ymv4DGsIjvTQ-": "MmSXHCxDwBs",
  "PLFKhhNd35zq90tdc3PYpx4IA-SoxSNlmN": "XV6pgF0uQxM",
  "PLlDg_wRHtbjLWfS-rGguPi1qNetGQ6Ogr": "SsfsuOUkPHo",
  "PLjdDBZW3EmXe6hO2Rt5Q9I5wzRZ7j7K8P": "uTpaICj8bow",
  "PL8PS-tykU-MiZtXZAYjfSW5-2WN4FwCGA": "jAS-5TebVuA",
  "PLHz_AreHm4dm24MhlWJYiR_Rm7TFtvs6S": "jQMbuK6URws",
};

export interface CourseMedia {
  videoId: string;
  thumbnailUrl: string;
  firstVideoUrl: string;
}

export function getCourseMedia(course: Pick<Course, "url">): CourseMedia | null {
  let listId: string | null = null;

  try {
    listId = new URL(course.url).searchParams.get("list");
  } catch {
    return null;
  }

  const videoId = listId ? firstVideoByPlaylist[listId] : undefined;
  if (!listId || !videoId) return null;

  return {
    videoId,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
    firstVideoUrl: `https://www.youtube.com/watch?v=${videoId}&list=${listId}`,
  };
}
