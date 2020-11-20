let theme = "light";

let light = {};
light.background = "#ffffff";
light.color = "#000000";
light.anylink = "#08088A";
light.themebutton = "Light Mode";			

let dark = {};
dark.background = "#000000";
dark.color = "#ffffff";
dark.anylink = "#ff0000";
dark.themebutton = "Dark Mode";

function SwitchTheme() {
	let current = (theme === "light") ? dark : light;

	document.body.style.background = current.background;
	document.body.style.color = current.color;
	document.getElementById("anylink").style.color = current.anylink;
	document.getElementById("themebutton").text = current.themebutton;

	theme = (theme === "light") ? "dark" : "light"; 
}

// Switch to dark theme as soon as page loads
SwitchTheme();
