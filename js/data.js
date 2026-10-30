// Edit this file to update projects, skills, achievements, and links.
// Leave a URL as '' until you have the real one: the page then shows a
// clearly labeled placeholder instead of a dead link.

const DATA = {
  email: 'naufafarros6@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Crezero' },
    { label: 'Instagram', url: 'https://www.instagram.com/crenovaz' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/naufa-habibburahman-farros-0464ba421?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  ],

  // Skill levels: practiced | project (used in a project) | exploring
  levels: { practiced: 'Practiced', project: 'Used in a project', exploring: 'Exploring' },
  skills: [
    { title: 'Programming & Computational Thinking', note: 'The foundation behind OSN Informatika.', items: [
      ['Programming fundamentals', 'practiced'], ['Algorithms and data structures', 'practiced'],
      ['Logical reasoning', 'practiced'], ['Problem-solving', 'practiced'] ] },
    { title: 'Web Development', note: 'Technologies from my own frontend work.', items: [
      ['HTML', 'project'], ['CSS', 'project'], ['JavaScript', 'project'],
      ['Responsive UI', 'project'], ['UI/UX implementation', 'project'], ['Frontend development', 'project'] ] },
    { title: 'Software & Application Development', note: 'Fundamentals I’m turning into complete projects.', items: [
      ['Software engineering fundamentals', 'practiced'], ['Git and version control', 'project'],
      ['Database fundamentals', 'practiced'], ['Application architecture', 'exploring'] ] },
    { title: 'Exploration & Future Learning', note: 'Topics I’m learning, not claiming.', items: [
      ['Artificial Intelligence and Machine Learning', 'exploring'], ['Mobile development', 'exploring'],
      ['Cybersecurity', 'exploring'], ['Data science', 'exploring'], ['Game development with Godot', 'project'] ] },
  ],

  categories: ['Web Development', 'Game Development', 'UI/UX', 'Experiments'],
  // status: Completed | In Progress | Concept | To be confirmed
  // image: preview screenshot, e.g. 'img/name.jpg' (16:9 works best). demoLabel: text for the demo link.
  projects: [
    { title: 'Cita Rasa: Online Food Ordering', mark: 'CR', categories: ['Web Development', 'UI/UX'], status: 'Completed',
      overview: 'An online food ordering interface for Cita Rasa, designed in Figma for desktop and phone in an orange-and-white palette.',
      purpose: 'Let customers browse a menu, order, and follow their delivery without friction, with the same experience on every screen size.',
      features: ['Food menu with prices and branch selection', 'Shopping cart and order form', 'Order tracking', 'Login and profile pages', 'Desktop and phone layouts'],
      tech: ['Figma', 'UI/UX design', 'Responsive layouts'],
      repo: '', demo: 'https://www.figma.com/design/Q0Ed9rtF2umkWgnc4BQhmZ/IMK-Hebat?node-id=0-1&t=IUqRVB0hFBudUYmq-1', demoLabel: 'Figma design',
      image: 'img/cita-rasa.jpg' },
    { title: 'Educational Website UI Improvements', mark: 'UI', categories: ['UI/UX', 'Experiments'], status: 'Concept',
      overview: 'A web mockup exploring a clearer, easier-to-use version of an educational data portal (Data Referensi Pendidikan).',
      purpose: 'Make information easier to find and read, on phones and on desktop.',
      features: ['Search-first hero for finding schools', 'Quick-access cards for the main tasks', 'Clear navigation and information hierarchy', 'Mobile navigation and desktop-to-mobile consistency', 'Accessible interface design'],
      tech: ['Figma', 'Responsive design', 'Accessibility', 'Usability'],
      repo: '', demo: 'https://www.figma.com/proto/6EnpqwiX0GI7TaAckmEZH0/Data-referensi?node-id=7-19&t=TkOeuQ7ZCvxhVkC5-1', demoLabel: 'Figma prototype',
      image: 'img/data-referensi.jpg' },
    { title: 'Runner’s Last Flame', mark: 'RF', categories: ['Game Development'], status: 'In Progress',
      overview: 'A pixel action runner through the five realms. Work in progress.',
      purpose: 'Practice building gameplay systems end to end: game logic, pixel-art integration, and iterative development.',
      features: ['Level-based play', 'Endless mode', 'Five realms to run through', 'Pixel-art visuals'],
      tech: ['Godot 4', 'Pixel art', 'Gameplay systems'], repo: '', demo: '', image: 'img/runners-last-flame.jpg' },
  ],

  // icon: trophy | compass | languages. stat: optional animated number.
  achievements: [
    { date: 'December 2024', icon: 'languages', title: 'English Camp II, East Java Province',
      detail: 'Participated in the English Camp II Event of East Java Province, a provincial English-language development program.' },
    { date: '2025', icon: 'trophy', featured: true, title: 'OSN Informatika, Kabupaten level: First Place',
      detail: 'Olimpiade Sains Nasional, Informatics. It shows in how I work: logical reasoning, analytical thinking, algorithmic problem-solving, and perseverance.' },
    { date: '2025', icon: 'compass', title: 'OSN Informatika, East Java Province: participant',
      detail: 'Competed at the provincial level, a chance to learn, improve, and challenge myself further.' },
  ],
};
