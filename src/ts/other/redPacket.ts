let rp_toggle: boolean = false;
(document.querySelector(".red-packet") as HTMLElement).addEventListener("click", () => {
    const paper = document.querySelector(".red-packet_paper") as HTMLElement;
    if (!rp_toggle) {
        paper.style.transform = "translateY(-180px)";
        rp_toggle=true;
    } else {
        paper.style.transform = "translateY(0)";
        rp_toggle=false;
    }
});
export {}