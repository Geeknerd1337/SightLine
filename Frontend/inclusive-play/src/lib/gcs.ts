import { Storage } from "@google-cloud/storage";

const cloudStorage = new Storage({
  projectId: "inclusive-play",
  keyFilename: "src/lib/secrets/sight-line-storage.json",
});

const bucket = cloudStorage.bucket("sightline_videos");

export const createWriteStream = (filename: string, contentType?: string) => {
  const ref = bucket.file(filename);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: contentType,
  });

  return stream;
};

export { cloudStorage };
