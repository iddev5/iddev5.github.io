---
slug: "future-of-x11"
title: "What does the future hold for X11?"
description: ""
date: 2026-11-08
author: Ayush
tags: [linux, x11, wayland]
featured: false
editable: false
draft: false
---

With the recent release of KDE 6.8 which dropped support for X11 sessions by default, it made me wonder how long is X11 going to survive. I personally have been a user of Cinnamon desktop environment since 2019 when I first started using Linux and never looked back at any other desktop environments.

<br />

Cinammon itself isn't Wayland yet. Certain apps do run under Wayland and it *was* planned to make the whole desktop environment atleast runnable on Wayland by December 2026.

<br />

I am excited to see what it would be like in terms of performance and stability. I am not really a window manager guy, I have tried it, liked it but eventually came back to full environments. I feel like the world of Wayland in general has/had less desktop environments and more "shells", that of couse is changing as all desktop environments are moving to the new technology.

<br />

Now talking about development side of things, I kind-of hate X11 libraries. Initially we had `libX11` which was okay but it was filled with legacy crufy and weird macros. To solve this they introduced `libxcb` except there was a problem: all proprietary tools, including graphics drivers compiled to `libX11`, which meant it never really left. The nastiest of the hacks is using `libglX` (which is based on `libX11`) with `libxcb`, just to get an OpenGL context.

<br />

I would imagine Wayland would be much cleaner in this department but I believe it is also verbose. I would like to try it soon.

<br />

Thanks for reading!
