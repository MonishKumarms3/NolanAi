/**
 * Metronic
 *
 * @format
 * @author: Keenthemes Copyright 2024 Keenthemes
 */

import KTDom from "./helpers/dom";
import KTUtils from "./helpers/utils";
import KTEventHandler from "./helpers/event-handler";
import { KTMenu } from "./components/menu";
import { KTDropdown } from "./components/dropdown";
import { KTModal } from "./components/modal";
import { KTDrawer } from "./components/drawer";
import { KTCollapse } from "./components/collapse";
import { KTDismiss } from "./components/dismiss";
import { KTTabs } from "./components/tabs";
import { KTAccordion } from "./components/accordion";
import { KTScrollspy } from "./components/scrollspy";
import { KTScrollable } from "./components/scrollable";
import { KTScrollto } from "./components/scrollto";
import { KTSticky } from "./components/sticky";
import { KTReparent } from "./components/reparent";
import { KTToggle } from "./components/toggle";
import { KTTooltip } from "./components/tooltip";
import { KTStepper } from "./components/stepper";
import { KTTheme } from "./components/theme";
import { KTImageInput } from "./components/image-input";
import { KTTogglePassword } from "./components/toggle-password";

export { KTMenu } from "./components/menu";
export { KTDropdown } from "./components/dropdown";
export { KTModal } from "./components/modal";
export { KTDrawer } from "./components/drawer";
export { KTCollapse } from "./components/collapse";
export { KTDismiss } from "./components/dismiss";
export { KTTabs } from "./components/tabs";
export { KTAccordion } from "./components/accordion";
export { KTScrollspy } from "./components/scrollspy";
export { KTScrollable } from "./components/scrollable";
export { KTScrollto } from "./components/scrollto";
export { KTSticky } from "./components/sticky";
export { KTReparent } from "./components/reparent";
export { KTToggle } from "./components/toggle";
export { KTTooltip } from "./components/tooltip";
export { KTStepper } from "./components/stepper";
export { KTTheme } from "./components/theme";
export { KTImageInput } from "./components/image-input";
export { KTTogglePassword } from "./components/toggle-password";

const KTComponents = {
	init(): void {
		KTMenu.init();
		KTDropdown.init();
		KTModal.init();
		KTDrawer.init();
		KTCollapse.init();
		KTDismiss.init();
		KTTabs.init();
		KTAccordion.init();
		KTScrollspy.init();
		KTScrollable.init();
		KTScrollto.init();
		KTSticky.init();
		KTReparent.init();
		KTToggle.init();
		KTTooltip.init();
		KTStepper.init();
		KTTheme.init();
		KTImageInput.init();
		KTTogglePassword.init();
	},
};

declare global {
	interface Window {
		KTUtils: typeof KTUtils;
		KTDom: typeof KTDom;
		KTEventHandler: typeof KTEventHandler;
		KTMenu: typeof KTMenu;
		KTDropdown: typeof KTDropdown;
		KTModal: typeof KTModal;
		KTDrawer: typeof KTDrawer;
		KTCollapse: typeof KTCollapse;
		KTDismiss: typeof KTDismiss;
		KTTabs: typeof KTTabs;
		KTAccordion: typeof KTAccordion;
		KTScrollspy: typeof KTScrollspy;
		KTScrollable: typeof KTScrollable;
		KTScrollto: typeof KTScrollto;
		KTSticky: typeof KTSticky;
		KTReparent: typeof KTReparent;
		KTToggle: typeof KTToggle;
		KTTooltip: typeof KTTooltip;
		KTStepper: typeof KTStepper;
		KTTheme: typeof KTTheme;
		KTImageInput: typeof KTImageInput;
		KTTogglePassword: typeof KTTogglePassword;

		KTComponents: typeof KTComponents;
	}
}

window.KTUtils = KTUtils;
window.KTDom = KTDom;
window.KTEventHandler = KTEventHandler;
window.KTMenu = KTMenu;
window.KTDropdown = KTDropdown;
window.KTModal = KTModal;
window.KTDrawer = KTDrawer;
window.KTCollapse = KTCollapse;
window.KTDismiss = KTDismiss;
window.KTTabs = KTTabs;
window.KTAccordion = KTAccordion;
window.KTScrollspy = KTScrollspy;
window.KTScrollable = KTScrollable;
window.KTScrollto = KTScrollto;
window.KTSticky = KTSticky;
window.KTReparent = KTReparent;
window.KTToggle = KTToggle;
window.KTTooltip = KTTooltip;
window.KTStepper = KTStepper;
window.KTTheme = KTTheme;
window.KTImageInput = KTImageInput;
window.KTTogglePassword = KTTogglePassword;

window.KTComponents = KTComponents;

export default KTComponents;

KTDom.ready(() => {
	KTComponents.init();
});
