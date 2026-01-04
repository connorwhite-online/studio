const fs = require('fs');
const path = require('path');

// Directory containing project folders
const projectsDir = path.join(__dirname, '../public/media/projects');
const outputFile = path.join(__dirname, '../public/media/projects/images.json');

function getProjectImages() {
  const projects = {};

  // Read all project directories
  const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  projectFolders.forEach(projectId => {
    const projectPath = path.join(projectsDir, projectId);
    
    // Read all files in the project directory
    const files = fs.readdirSync(projectPath)
      .filter(file => {
        // Only include image files
        const ext = path.extname(file).toLowerCase();
        const isImage = ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
        // Exclude files with 'cover' in the name
        const isCover = file.toLowerCase().includes('cover');
        return isImage && !isCover;
      })
      .sort(); // Sort alphabetically

    // Convert to public URLs
    const imageUrls = files.map(file => `/media/projects/${projectId}/${file}`);
    
    projects[projectId] = imageUrls;
  });

  return projects;
}

// Generate the manifest
const projectImages = getProjectImages();

// Write to JSON file
fs.writeFileSync(outputFile, JSON.stringify(projectImages, null, 2));

console.log('✅ Project images manifest generated!');
console.log(`📁 Found ${Object.keys(projectImages).length} projects`);
Object.entries(projectImages).forEach(([projectId, images]) => {
  console.log(`   ${projectId}: ${images.length} images`);
});

