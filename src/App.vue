<template>
  <div class="relative bg-parchment text-obsidian font-mono min-h-screen">
    <div class="scroll-progress" aria-hidden="true" :style="{ width: `${scrollPercent}%` }"></div>
    <div class="grid-guide" aria-hidden="true"></div>

    <aside class="telemetry telemetry-top" aria-live="polite">
      <p>Status: <span>{{ currentSection }}</span></p>
      <p>Scroll: <span>{{ paddedScroll }}</span></p>
    </aside>

    <aside class="telemetry telemetry-bottom" aria-live="polite">
      <p>X:<span>{{ mouseX }}</span> Y:<span>{{ mouseY }}</span></p>
    </aside>

    <main>
      <section id="hero" class="panel panel-hero" data-label="01_The_Hero">
        <p class="section-id">01 // The Hero</p>
        <div class="hero-block">
          <h1 class="outline-title" data-fillable="true" :style="{ backgroundSize: `${outlineFill}% 100%` }">
            GYLES PEREZ
          </h1>
          <p class="hero-typing" aria-label="role">{{ typedLine }}</p>
          <p class="hero-description">
            Full-stack developer shaping robust systems with architectural precision,
            quality results, and measurable performance.
          </p>
        </div>
      </section>

      <section id="repository" class="panel" data-label="02_The_Repository">
        <p class="section-id">02 // The Repository</p>
        <header class="panel-header">
          <h2>Technical Spec Sheets</h2>
        </header>
        <div v-if="projects.length" class="project-grid">
          <article v-for="project in projects" :key="project.name" class="spec-card">
            <div class="spec-image" :style="{ background: project.image }"></div>
            <h3 class="spec-title">{{ project.name }}</h3>
            <p class="spec-row"><span class="label">Function:</span>{{ project.function }}</p>
            <p class="spec-row"><span class="label">Dependencies:</span>{{ project.dependencies }}</p>
            <p class="spec-row"><span class="label">Performance_Metric:</span>{{ project.metric }}</p>
            <p class="spec-row"><span class="label">Build_Date:</span>{{ project.buildDate }}</p>
            <p v-if="project.tag" class="spec-row signal-tag"><span class="label">Tag:</span>{{ project.tag }}</p>
          </article>
        </div>
        <p v-else class="empty-state">Project entries pending. Technical spec sheets will be added soon.</p>
      </section>

      <section id="systems" class="panel" data-label="03_The_Skillsets">
        <p class="section-id">03 // The Skillsets</p>
        <header class="panel-header">
          <h2>Data Clusters</h2>
        </header>
        <div class="data-clusters">
          <article v-for="cluster in clusters" :key="cluster.label" class="cluster">
            <p class="cluster-label">{{ cluster.label }}</p>
            <p class="cluster-value">{{ cluster.value }}</p>
          </article>
        </div>
        <div class="skills-panel">
          <h3>Experience</h3>
          <div class="experience-list">
            <article v-for="experience in experiences" :key="experience.organization" class="experience-card">
              <p class="experience-org">{{ experience.organization }}</p>
              <p class="experience-program">{{ experience.program }}</p>
              <p class="experience-summary">{{ experience.summary }}</p>
              <div class="experience-items">
                <div
                  v-for="item in experience.contributions"
                  :key="item.project"
                  class="experience-item"
                >
                  <p class="experience-project">{{ item.project }}</p>
                  <p class="experience-detail">{{ item.detail }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer id="terminal" class="terminal-footer" data-label="04_Terminal_Output">
        <p class="section-id section-id-light">04 // Terminal Output</p>
        <div class="terminal-window">
          <div class="terminal-topbar">
            <span class="terminal-dot"></span>
            <span class="terminal-dot"></span>
            <span class="terminal-dot"></span>
            <p class="terminal-title">session://gyles-perez/contact</p>
          </div>
          <div class="terminal-body">
            <p class="terminal-line"><span class="terminal-tag">gyles@portfolio</span>:~$ contact --show</p>
            <button class="copy-target" @click="copyEmail">{{ copyLabel }}</button>
            <p class="terminal-line"><span class="terminal-tag">gyles@portfolio</span>:~$ ls links/</p>
            <ul class="terminal-links">
              <li><span class="terminal-path">./github</span><a href="https://github.com/codenavie" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><span class="terminal-path">./linkedin</span><a href="https://www.linkedin.com/in/gyles-perez-287aa43ba/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><span class="terminal-path">./resume</span><a href="#" target="_blank" rel="noreferrer">Resume.pdf</a></li>
            </ul>
            <p class="terminal-line"><span class="terminal-tag">gyles@portfolio</span>:~$ <span class="terminal-cursor">_</span></p>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { clusters, experiences, projects } from "./assets/profile";

const currentSection = ref("01_The_Hero");
const scrollPercent = ref(0);
const mouseX = ref("0000");
const mouseY = ref("0000");
const outlineFill = ref(0);

const fullTypingMessage = ">_ Developer|";
const typedLine = ref("");
const typingIndex = ref(0);
const copyLabel = ref("gylesperez498@gmail.com");
const sectionNodes = ref([]);
const fillableTitle = ref(null);

let typingTimeout;

const paddedScroll = computed(() => `${String(scrollPercent.value).padStart(3, "0")}%`);

function padNumber(value, length = 4) {
  return String(value).padStart(length, "0");
}

function updateOutlineFill() {
  if (!fillableTitle.value) {
    return;
  }

  const rect = fillableTitle.value.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
  outlineFill.value = Math.round(ratio * 100);
}

function updateActiveSection() {
  const midpoint = window.innerHeight * 0.35;

  const active = sectionNodes.value.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= midpoint && rect.bottom >= midpoint;
  });

  if (active) {
    currentSection.value = active.dataset.label;
  }
}

function onScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollPercent.value = Math.round(progress * 100);
  updateActiveSection();
  updateOutlineFill();
}

function onMouseMove(event) {
  mouseX.value = padNumber(event.clientX);
  mouseY.value = padNumber(event.clientY);
}

function typeNext() {
  typedLine.value = fullTypingMessage.slice(0, typingIndex.value);
  typingIndex.value += 1;

  if (typingIndex.value <= fullTypingMessage.length) {
    typingTimeout = setTimeout(typeNext, 80);
  }
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText("gylesperez498@gmail.com");
    copyLabel.value = "Copied: gylesperez498@gmail.com";
  } catch {
    copyLabel.value = "Clipboard unavailable";
  }

  setTimeout(() => {
    copyLabel.value = "gylesperez498@gmail.com";
  }, 1800);
}

onMounted(() => {
  sectionNodes.value = [...document.querySelectorAll("[data-label]")];
  fillableTitle.value = document.querySelector("[data-fillable]");
  typeNext();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("mousemove", onMouseMove);

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
});
</script>
