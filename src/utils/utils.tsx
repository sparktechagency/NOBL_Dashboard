export const getDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("File not provided");
      return;
    }

    const media = document.createElement(
      file.type.startsWith("video") ? "video" : "audio"
    );
    media.src = URL.createObjectURL(file);

    media.onloadedmetadata = () => {
      resolve(media.duration);
    };

    media.onerror = () => {
      reject("Error loading media");
    };
  });
};
