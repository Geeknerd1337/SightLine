export interface ModalContent {
  title: string;
  text: string;
}

export const FlashModalContent: ModalContent = {
  title: "Flash Warning",
  text: "This portion of the video contains flashing lights which can cause seizures in those suffering from epilepsy. Be sure to include warnings that flashing lights may be present or consider adding a setting to disable them entirely.",
};

export const BlueModalContent: ModalContent = {
  title: "Blue Light Warning",
  text: "This portion of the video contains blue light which can cause eye strain and headaches. Be sure to include warnings that blue light may be present or consider adding a setting to disable them entirely.",
};

export const LuminanceModalContent: ModalContent = {
  title: "Luminance Warning",
  text: "This portion of the video contains a large change in luminance which can cause eye strain and headaches. Be sure to include warnings that luminance changes may be present or consider adding a setting to disable them entirely.",
};
