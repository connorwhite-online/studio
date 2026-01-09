import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';
import ProjectVideo from '../ProjectVideo';
import { MediaItem } from '../ProjectImageGallery';

export default function Sqft() {
  // Define all media items for the gallery (images and videos)
  const galleryMedia: MediaItem[] = [
    { type: 'image', src: '/media/projects/sqft/sqft-01.png' },
    { type: 'image', src: '/media/projects/sqft/sqft-02.png' },
    { type: 'video', src: '/media/projects/sqft/sqft-desktop.mov' },
    { type: 'video', src: '/media/projects/sqft/sqft-05.MP4' },
    { type: 'image', src: '/media/projects/sqft/sqft-03.png' },
    { type: 'image', src: '/media/projects/sqft/sqft-06.PNG' },
  ];

  return (
    <div className={styles.projectContent}>

      <ProjectImage
        src="/media/projects/sqft/sqft-01.png"
        alt="Storefront and 3D model view"
        projectId="sqft"
        galleryMedia={galleryMedia}
        priority
      />
    <div className={styles.section}>
      <ProjectImage
        src="/media/projects/sqft/sqft-02.png"
        alt="Opening image and text"
        projectId="sqft"
        galleryMedia={galleryMedia}
      />
      <p>Super low-contrast text emphasizes the opening image, and keeps secondary information minimally obstructive.</p>
      </div>

      <ProjectVideo
        src="/media/projects/sqft/sqft-desktop.mov"
        alt="Full site animations and 3D model interactions"
        projectId="sqft"
        galleryMedia={galleryMedia}
      />

      <div className={styles.section}>
      <ProjectVideo
        src="/media/projects/sqft/sqft-05.MP4"
        alt="Mobile magazine interaction"
        projectId="sqft"
        galleryMedia={galleryMedia}
      />
      <p>In the absence of a cursor, the magazine can be manipulated but will gradually return to optimal angles once released. A timed rotation snap allows the user to see the best angles of the front and back covers.</p>
      </div>

      <ProjectImage
        src="/media/projects/sqft/sqft-03.png"
        alt="Sq Ft Storefront"
        projectId="sqft"
        galleryMedia={galleryMedia}
      />
    <div className={styles.section}>
      <ProjectImage
        src="/media/projects/sqft/sqft-06.PNG"
        alt="Magazine 3D Modeling Process"
        projectId="sqft"
        galleryMedia={galleryMedia}
      />
      <p>I modeled the magazine replica in Blender with dimensional accuracy and exported as a glb file. The print artwork was baked onto the model surface for more performant rendering.</p>
    </div>
    </div>
  );
}