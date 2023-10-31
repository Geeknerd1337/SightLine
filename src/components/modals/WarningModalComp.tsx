export interface ModalContent {
  title: string;
  text: string;
  urlTitle: string[];
  url: string[];
}

export const FlashModalContent: ModalContent = {
  title: "Flash Warning",
  text: "This portion of the video contains flashing lights which can cause seizures in those suffering from epilepsy or other photosensitive disorders; red light can be especially harmful. Flashing can also be caused by the display or computer screen. Be sure to include warnings that flashing lights may be present or consider adding a setting to disable them entirely.",
  urlTitle: ["W3C.org"],
  url: [
    "https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html",
  ],
};

export const BlueModalContent: ModalContent = {
  title: "Blue Light Warning",
  text: "This portion of the video contains blue light, which can cause eye strain and has shown correlation that it could damage various parts of the eye, while also hurting a person's circadian rhythm, along with causing headaches. Be sure to include warnings that blue light may be present or consider adding a setting to disable them entirely.",
  urlTitle: ["NCBI.gov", "Health at UC Davis"],
  url: [
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6288536/",
    "https://health.ucdavis.edu/blog/cultivating-health/blue-light-effects-on-your-eyes-sleep-and-health/2022/08",
  ],
};

export const LuminanceModalContent: ModalContent = {
  title: "Luminance Warning",
  text: "This portion of the video contains a large change in luminance which can cause eye strain and headaches. Be sure to include warnings that luminance changes may be present or consider adding a setting to disable them entirely.",
  urlTitle: ["Health at Harvard"],
  url: [
    "https://www.health.harvard.edu/diseases-and-conditions/electronic-screen-alert-avoid-this-vision-risk",
  ],
};
