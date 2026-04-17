---
slug: "milk-testing-utility-patent"
title: "From a hackathon project to a utility patent"
description: "An overview on how I got a utility patent to my name"
date: 2026-04-09
author: Ayush
tags: [achievement, patent, iot, hackathon]
featured: false
editable: false
draft: true
---

<hr />

## [The Background](#the-background)

On 1st April, 2026, I was granted my first ever patent. It is a IoT enabled milk quality analysis device. Now, I am not much inclined towards electronics, so my contribution to this project was more on the web and backend side. It started sometime last year. Me and my team mates were attending a over-night hackathon. The device was already developed by Debadutta Patra prior to me joining the project, what was missing was a systematic data store and classification system, and some way to represent the said data in a nice frontend.

## [The Crunch](#the-crunch)

The frontend part was easy, after all it was 2025! I went ahead with the safe combination of React.js with Chart.js. The backend was where all the magic happened. We effectively had to design a system to fetch data collected from sensors from a ThinkSpeak channel, then run a hybrid Neural Network model to classify the data, which was trained on an existing set of fresh milk sample observations.

The model was a multi-task, time series neural network. It takes sensor reading over time and produces two outputs:
1. Classification: What stage of spoilage the milk is in
2. Regression: How much time remains before it reaches the next stage

I went through multiple different iterations on how it should be implemented. Starting from the Neural Network model itself using Tensorflow and Python, so for the backend it was natural to choose Python and some web framework with it. For me it was FastAPI because of my past experience and smooth developer experience. But deploying a Python backend is rather difficult on most free services. The ones I explored were Vercel Edge Functions and Render.

Render is rather slow and the backend tends to sleep often with long starting times. Vercel's runtime on the other hand is fast, always active but filled with esoteric bugs when used with Python, some of which have been fixed since then. Just do remember to set all access control headers, allow required methods and setup route rewrites from the base source (/*) to the destination Python script path. I have since moved to using AWS EC2 for my current projects, despite it's cost, it is the best option.

## [Outcome](#outcome)

We ended up winning the hackathon and the judges were quite impressed with the results. After the hackathon, we did improved it further, regarding accuracy and performance of the device and eventually decided to file a utility patent. The application was registered on 15th of May, 2025 and was granted after approximately one year on 1st of April, 2026. The difficult part is neither developing the product nor filing the claims, but rather justifying it. The verification process is rather brutal and for the right reasons. We got one FER during the verification process and had to back our claims in detail.

## [Conclusion](#conclusion)

So that's how the project was developed and a patent was granted. It was a great learning experience and I would be doing more such projects in the future too!

Thanks for reading. Hope you liked this blog post!
