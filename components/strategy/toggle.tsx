export const toggleDrawer = () => {
  let Drawer = document.getElementById("Drawer");
  if (Drawer == null) return;
  if (Drawer.style.right != "100%") Drawer.style.right = "100%";
  else Drawer.style.right = (document.body.clientWidth - Drawer.offsetWidth).toString() + "px";
}
