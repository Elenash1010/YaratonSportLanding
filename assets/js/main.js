const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");

function syncHeaderState() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 8);
}

function closeMenu() {
  if (!header || !menuToggle) return;
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const nextState = !item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove("open");
    });
    item.classList.toggle("open", nextState);
  });
});

document.querySelectorAll(".schedule-tabs").forEach((tabGroup) => {
  const buttons = [...tabGroup.querySelectorAll(".tab-btn")];
  const scope = tabGroup.closest(".schedule-card");
  if (!scope || buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.day;
      buttons.forEach((innerButton) => innerButton.classList.toggle("active", innerButton === button));
      scope.querySelectorAll(".day-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
      });
      syncScheduleEmptyStates();
    });
  });
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 })
  : null;

document.querySelectorAll("[data-reveal]").forEach((element) => {
  if (!revealObserver) {
    element.classList.add("is-visible");
    return;
  }
  revealObserver.observe(element);
});

const panelBackdrop = document.getElementById("panelBackdrop");
const directionPanel = document.getElementById("directionPanel");
const panelClose = document.getElementById("panelClose");
const panelKicker = document.getElementById("panelKicker");
const panelTitle = document.getElementById("panelTitle");
const panelLead = document.getElementById("panelLead");
const panelOutline = document.getElementById("panelOutline");
const panelGenericLead = document.getElementById("panelGenericLead");
const panelGenericView = document.getElementById("panelGenericView");
const panelScenarioView = document.getElementById("panelScenarioView");
const panelScheduleAction = document.getElementById("panelScheduleAction");
const panelBookingAction = document.getElementById("panelBookingAction");

const scenarioHeroMedia = document.getElementById("scenarioHeroMedia");
const scenarioFormatHint = document.getElementById("scenarioFormatHint");
const scenarioChipRow = document.getElementById("scenarioChipRow");
const scenarioLocationMedia = document.getElementById("scenarioLocationMedia");
const scenarioLocationTitle = document.getElementById("scenarioLocationTitle");
const scenarioLocationDescription = document.getElementById("scenarioLocationDescription");
const scenarioLocationLink = document.getElementById("scenarioLocationLink");
const scenarioScheduleMeta = document.getElementById("scenarioScheduleMeta");
const scenarioScheduleList = document.getElementById("scenarioScheduleList");
const scenarioTrainersSection = document.getElementById("scenarioTrainersSection");
const scenarioTrainersGrid = document.getElementById("scenarioTrainersGrid");
const panelLocationView = document.getElementById("panelLocationView");
const locationLead = document.getElementById("locationLead");
const locationHeroMedia = document.getElementById("locationHeroMedia");
const locationHighlightsHint = document.getElementById("locationHighlightsHint");
const locationHighlights = document.getElementById("locationHighlights");
const locationRelatedDirections = document.getElementById("locationRelatedDirections");
const locationActivitiesMeta = document.getElementById("locationActivitiesMeta");
const locationActivitiesList = document.getElementById("locationActivitiesList");

const panelMiniBackdrop = document.getElementById("panelMiniBackdrop");
const panelMiniModal = document.getElementById("panelMiniModal");
const panelMiniClose = document.getElementById("panelMiniClose");
const miniModalTitle = document.getElementById("miniModalTitle");
const miniModalTime = document.getElementById("miniModalTime");
const miniModalName = document.getElementById("miniModalName");
const miniModalDay = document.getElementById("miniModalDay");
const miniModalLocation = document.getElementById("miniModalLocation");
const miniModalDescription = document.getElementById("miniModalDescription");
const scheduleSection = document.getElementById("schedule");
const weeklyOverviewCard = document.getElementById("weeklyOverviewCard");
const scheduleFilterBar = document.getElementById("scheduleFilterBar");
const scheduleFilterTitle = document.getElementById("scheduleFilterTitle");
const scheduleFilterClear = document.getElementById("scheduleFilterClear");

const scheduleFilterLabels = {
  "free-swimming": "Свободное плавание"
};

const scenarioPanels = {
  water: {
    kicker: "Направление 01",
    title: "Водная зона",
    lead: "Панель для водного сценария станет точкой входа к бассейну, тренировочным слотам, акваформатам и записи без перехода на отдельную страницу.",
    formatHint: "Выберите формат, чтобы уточнить содержание",
    scheduleCta: "Смотреть полное расписание",
    bookingLabel: "Записаться / Получить консультацию",
    formats: {
      free: {
        label: "Свободное плавание",
        heroImage: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Свободный водный ритм для тех, кто хочет снять напряжение, восстановиться после дня и пройти свою дистанцию без визуального шума вокруг.",
        location: {
          title: "Бассейн",
          description: "Просторная водная локация для самостоятельных тренировок, восстановления и комфортного плавания в спокойном темпе.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "08:00",
            name: "Свободное плавание",
            day: "Ежедневно",
            location: "Бассейн",
            details: "Спокойное утреннее окно для самостоятельного плавания и мягкого старта дня."
          },
          {
            time: "12:30",
            name: "Свободное плавание",
            day: "Будни",
            location: "Бассейн",
            details: "Дневной слот для тех, кто предпочитает тихую воду и свободный темп посещения."
          },
          {
            time: "20:00",
            name: "Свободное плавание",
            day: "Ежедневно",
            location: "Бассейн",
            details: "Вечернее посещение для восстановления, разгрузки и комфортного плавания после работы."
          }
        ]
      },
      group: {
        label: "Групповые занятия",
        heroImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Групповой водный формат с собранным ритмом, поддержкой тренера и понятной структурой занятия для тех, кому важна энергия команды.",
        location: {
          title: "Большой бассейн",
          description: "Основная водная локация для групповых тренировок с разделением дорожек и комфортной видимостью для тренера.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "09:15",
            name: "Групповое занятие в воде",
            day: "Пн / Ср / Пт",
            location: "Большой бассейн",
            details: "Собранный формат для тех, кто хочет работать в группе и держать ровный тренировочный ритм."
          },
          {
            time: "18:30",
            name: "Вечерняя группа",
            day: "Вт / Чт",
            location: "Большой бассейн",
            details: "Интенсивнее дневных слотов, но без перегруза, с понятной структурой для регулярных посещений."
          },
          {
            time: "19:45",
            name: "Группа для взрослых",
            day: "Сб",
            location: "Большой бассейн",
            details: "Формат выходного дня с акцентом на технику, выносливость и уверенность в воде."
          }
        ],
        trainers: [
          {
            name: "Гречаненко Яна Викторовна",
            role: "тренер по плаванию",
            initials: "ЯВ"
          },
          {
            name: "Лучинкин Степан Андреевич",
            role: "тренер «Школы плавания ФОК»",
            initials: "СА"
          }
        ]
      },
      personal: {
        label: "Индивидуально",
        heroImage: "https://images.unsplash.com/photo-1594736797933-d0d10d7dd2e9?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Персональная работа в воде для точной настройки техники, темпа и нагрузки под конкретную цель без компромиссов по вниманию.",
        location: {
          title: "Дорожка для персональной работы",
          description: "Выделенная зона бассейна для индивидуальных тренировок, где легко держать темп, получать обратную связь и работать точечно.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "10:00",
            name: "Персональная тренировка",
            day: "По записи",
            location: "Индивидуальная дорожка",
            details: "Персональный слот для взрослых и подростков с акцентом на технику и уверенность в воде."
          },
          {
            time: "14:00",
            name: "Техника плавания 1:1",
            day: "Будни",
            location: "Индивидуальная дорожка",
            details: "Формат для тех, кто хочет точечно скорректировать движения и сделать прогресс быстрее."
          },
          {
            time: "19:00",
            name: "Вечерний персональный слот",
            day: "По записи",
            location: "Индивидуальная дорожка",
            details: "Гибкое окно под персональную цель: восстановление, техника или спокойная нагрузка."
          }
        ],
        trainers: [
          {
            name: "Гречаненко Яна Викторовна",
            role: "тренер по плаванию",
            initials: "ЯВ"
          },
          {
            name: "Лучинкин Степан Андреевич",
            role: "тренер «Школы плавания ФОК»",
            initials: "СА"
          }
        ]
      },
      aqua: {
        label: "Аквааэробика",
        heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Динамичный, но мягкий формат в воде для тех, кому нужна подвижность, тонус и заметная разгрузка суставов без жёсткой ударной нагрузки.",
        location: {
          title: "Аквазона",
          description: "Зона бассейна для ритмичных водных классов с комфортной глубиной, ясной подачей тренера и безопасной нагрузкой.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "11:00",
            name: "Аквааэробика",
            day: "Вт / Чт",
            location: "Аквазона",
            details: "Средний темп, хорошая динамика и понятная структура для регулярных посещений."
          },
          {
            time: "17:15",
            name: "Аквааэробика после работы",
            day: "Пн / Ср",
            location: "Аквазона",
            details: "Вечерний формат, который помогает снять напряжение и при этом сохранить тренировочный эффект."
          },
          {
            time: "13:00",
            name: "Мягкая аквааэробика",
            day: "Сб",
            location: "Аквазона",
            details: "Более спокойный класс с мягким входом в нагрузку и вниманием к комфорту движения."
          }
        ],
        trainers: [
          {
            name: "Ласкова Людмила Александровна",
            role: "тренер по аквааэробике и йоге",
            initials: "ЛА"
          },
          {
            name: "Овечкина Надежда Фёдоровна",
            role: "тренер по аквааэробике, йоге, фитнесу",
            initials: "НФ"
          }
        ]
      },
      pregnancy: {
        label: "Для беременных",
        heroImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Деликатный водный сценарий с ощущением безопасности, поддержки и мягкого движения там, где особенно важны внимание к самочувствию и спокойный темп.",
        location: {
          title: "Малый бассейн",
          description: "Спокойная водная локация с мягкой атмосферой и подходящими условиями для щадящих занятий во время беременности.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "10:30",
            name: "Вода для беременных",
            day: "Вт / Пт",
            location: "Малый бассейн",
            details: "Мягкое занятие с упором на комфорт, дыхание и бережную подвижность в воде."
          },
          {
            time: "15:00",
            name: "Поддерживающий водный класс",
            day: "Ср",
            location: "Малый бассейн",
            details: "Спокойный формат с деликатной нагрузкой и устойчивым ритмом без перегруза."
          },
          {
            time: "17:00",
            name: "Вечерняя мягкая практика",
            day: "Пн",
            location: "Малый бассейн",
            details: "Небольшая группа для комфортного завершения дня и ощущения лёгкости в теле."
          }
        ],
        trainers: [
          {
            name: "Ласкова Людмила Александровна",
            role: "тренер по аквааэробике и йоге",
            initials: "ЛА"
          },
          {
            name: "Овечкина Надежда Фёдоровна",
            role: "тренер по аквааэробике, йоге, фитнесу",
            initials: "НФ"
          }
        ]
      },
      kids: {
        label: "Детские группы",
        heroImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Детские водные форматы с ясной структурой, спокойной подачей и прогрессом от уверенности в воде к технике и дисциплине без жёсткого давления.",
        location: {
          title: "Учебный бассейн",
          description: "Безопасная учебная локация для детских групп с комфортной глубиной, наглядной работой тренера и понятной организацией занятия.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "16:00",
            name: "Детская группа 6+",
            day: "Пн / Ср",
            location: "Учебный бассейн",
            details: "Базовый формат для адаптации к воде, дисциплины и первых уверенных движений."
          },
          {
            time: "17:00",
            name: "Детская техника плавания",
            day: "Вт / Чт",
            location: "Учебный бассейн",
            details: "Занятие с акцентом на координацию, дыхание и правильную механику движения."
          },
          {
            time: "11:30",
            name: "Субботняя детская группа",
            day: "Сб",
            location: "Учебный бассейн",
            details: "Более спокойный слот выходного дня для регулярной практики без спешки."
          }
        ],
        trainers: [
          {
            name: "Петров Александр Дмитриевич",
            role: "тренер «Школы плавания «Дельфинчик»",
            initials: "ПА"
          }
        ]
      }
    }
  },
  training: {
    kicker: "Направление 02",
    title: "Тренировки",
    lead: "Панель для активных тренировок станет каркасом под маршруты к залам, форматам занятий, персональной работе и удобному расписанию.",
    formatHint: "Выберите формат, чтобы уточнить содержание",
    scheduleCta: "Полное расписание",
    bookingLabel: "Записаться",
    formats: {
      gym: {
        label: "Тренажёрный зал",
        heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Интенсивная и разнообразная активность: самостоятельные, персональные, групповые и игровые форматы.",
        location: {
          title: "Тренажёрный зал",
          description: "Пространство для самостоятельных тренировок и индивидуальной работы с тренером, где легко выстроить свой ритм и программу.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "07:00",
            name: "Самостоятельная тренировка",
            day: "Ежедневно",
            location: "Тренажёрный зал",
            details: "Утреннее окно для тех, кто любит начать день с собственного темпа, без ожиданий и перегрузки."
          },
          {
            time: "17:30",
            name: "Персональная тренировка",
            day: "По записи",
            location: "Тренажёрный зал",
            details: "Точная индивидуальная работа с тренером под цель: сила, выносливость, возвращение к форме."
          }
        ]
      },
      group: {
        label: "Групповые тренировки",
        heroImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Собранный групповой ритм для тех, кому важны энергия зала, структура занятия и понятная динамика от разминки до финала.",
        location: {
          title: "Спортивный зал",
          description: "Универсальная локация для групповых тренировок, функциональных классов и активных сценариев в общем ритме.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "09:00",
            name: "Функциональная группа",
            day: "Пн / Ср / Пт",
            location: "Спортивный зал",
            details: "Групповой класс с ясной структурой и динамикой для тех, кто любит работать в общем темпе."
          },
          {
            time: "19:00",
            name: "Вечерняя тренировка",
            day: "Вт / Чт",
            location: "Спортивный зал",
            details: "Активный вечерний слот с сильной энергетикой и понятным ритмом внутри группы."
          }
        ]
      },
      trainer: {
        label: "С тренером",
        heroImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Персональный сценарий для тех, кому нужна точная обратная связь, понятный прогресс и контроль нагрузки без случайных решений.",
        location: {
          title: "Персональная зона",
          description: "Часть тренировочного пространства, где удобно работать 1:1, разбирать технику и настраивать программу под задачу.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1518611012118-fd2a8af8a1e2?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "10:30",
            name: "Персональный слот",
            day: "По записи",
            location: "Персональная зона",
            details: "Формат для тех, кому нужна точная настройка техники, темпа и программы."
          },
          {
            time: "18:15",
            name: "Вечер с тренером",
            day: "Будни",
            location: "Персональная зона",
            details: "Персональная работа после дня: фокус на качестве движения и управляемой нагрузке."
          }
        ]
      },
      game: {
        label: "Игровые форматы",
        heroImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Игровая активность для тех, кому важны динамика, реакция, соревновательный элемент и ощущение живого движения без монотонности.",
        location: {
          title: "Универсальный зал",
          description: "Большая площадка для игровых тренировок, командных сценариев и динамичных форматов с меняющимся ритмом.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "16:30",
            name: "Игровая тренировка",
            day: "Вт / Чт",
            location: "Универсальный зал",
            details: "Сценарий для тех, кто любит активную групповую динамику и живую игровую механику."
          },
          {
            time: "20:00",
            name: "Вечерний игровой формат",
            day: "Сб",
            location: "Универсальный зал",
            details: "Слот с более свободной динамикой, соревновательным элементом и хорошей сменой темпа."
          }
        ]
      }
    }
  },
  recovery: {
    kicker: "Направление 03",
    title: "Оздоровление и восстановление",
    lead: "Панель для мягких восстановительных сценариев станет точкой входа к бережным практикам, спокойным локациям и удобному расписанию без лишней навигации.",
    formatHint: "Выберите формат, чтобы уточнить содержание",
    scheduleCta: "Полное расписание",
    bookingLabel: "Записаться",
    formats: {
      yoga: {
        label: "Йога",
        heroImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Мягкие техники движения и бережные практики для восстановления ресурса, гибкости и внутреннего баланса.",
        location: {
          title: "Йога-зал",
          description: "Тихое и светлое пространство для мягкой практики, концентрации и восстановления с комфортным ритмом занятия.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "09:00",
            name: "Йога",
            day: "Пн / Ср / Пт",
            location: "Йога-зал",
            details: "Спокойная практика для мягкого входа в день, восстановления подвижности и внутренней собранности."
          },
          {
            time: "18:30",
            name: "Вечерняя йога",
            day: "Будни",
            location: "Йога-зал",
            details: "Размеренный вечерний класс для снятия напряжения, дыхания и возврата к ровному внутреннему ритму."
          }
        ]
      },
      qigong: {
        label: "Цигун",
        heroImage: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Спокойная медитативная практика для тех, кому важны дыхание, устойчивость, мягкая концентрация и деликатное восстановление без перегруза.",
        location: {
          title: "Зал мягких практик",
          description: "Неспешное, камерное пространство для дыхательных и восстановительных занятий с акцентом на внутреннее спокойствие и плавность движения.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1518611012118-fd2a8af8a1e2?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "10:30",
            name: "Цигун",
            day: "Вт / Чт",
            location: "Зал мягких практик",
            details: "Неспешная восстановительная практика с вниманием к дыханию, координации и устойчивому состоянию."
          },
          {
            time: "17:45",
            name: "Вечерний цигун",
            day: "Пн / Ср",
            location: "Зал мягких практик",
            details: "Вечерний формат для тех, кто хочет снизить перегрузку и перейти в более спокойный режим."
          }
        ]
      },
      pregnancy_yoga: {
        label: "Йога для беременных",
        heroImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Бережная практика с акцентом на комфорт, мягкую подвижность и ощущение безопасности в период, когда особенно важны внимание к телу и спокойный темп.",
        location: {
          title: "Тихий зал",
          description: "Спокойное пространство для деликатных занятий во время беременности, где легко держать мягкий ритм и чувствовать опору.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "11:00",
            name: "Йога для беременных",
            day: "Вт / Пт",
            location: "Тихий зал",
            details: "Мягкий класс с акцентом на дыхание, расслабление и комфортную подвижность без лишней нагрузки."
          },
          {
            time: "16:00",
            name: "Поддерживающая практика",
            day: "Ср",
            location: "Тихий зал",
            details: "Бережный формат для сохранения лёгкости, устойчивости и спокойного ощущения тела."
          }
        ]
      }
    }
  },
  relax: {
    kicker: "Направление 04",
    title: "Релакс",
    lead: "Панель для релакс-сценария станет точкой входа к тёплым восстановительным зонам, спокойным форматам и мягкому завершению визита внутри одной логики.",
    formatHint: "Выберите формат, чтобы уточнить содержание",
    scheduleCta: "Полное расписание",
    bookingLabel: "Записаться",
    formats: {
      sauna: {
        label: "Сауна",
        heroImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Пространство отдыха и восстановления после активности: спокойный ритм, тепло, вода и ощущение паузы.",
        location: {
          title: "Сауна с малым бассейном",
          description: "Тёплая восстановительная зона для расслабления после тренировки, снятия напряжения и мягкого возврата к спокойному состоянию.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1519822473471-5d0d02d60c41?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "10:00",
            name: "Свободное посещение сауны",
            day: "Ежедневно",
            location: "Сауна",
            details: "Спокойный дневной слот для восстановления, тепла и размеренного отдыха после активности."
          },
          {
            time: "19:00",
            name: "Вечерний релакс-слот",
            day: "Ежедневно",
            location: "Сауна",
            details: "Вечернее окно для мягкого расслабления, снятия мышечного напряжения и ощущения паузы."
          }
        ]
      },
      lounge: {
        label: "Лаунж-зона",
        heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
        atmosphere: "Тихий сценарий для тех, кому нужен отдых без спешки: мягкий свет, спокойное дыхание пространства и ощущение внутренней разгрузки.",
        location: {
          title: "Лаунж-зона",
          description: "Камерное пространство для неспешного отдыха, восстановления после нагрузки и мягкого завершения визита.",
          cta: "Открыть локацию",
          image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80"
        },
        schedule: [
          {
            time: "11:30",
            name: "Дневной релакс",
            day: "Ежедневно",
            location: "Лаунж-зона",
            details: "Спокойный слот для восстановления ритма, отдыха и мягкого переключения после нагрузки."
          },
          {
            time: "18:30",
            name: "Вечерняя пауза",
            day: "Будни",
            location: "Лаунж-зона",
            details: "Неспешный вечерний сценарий для тех, кто хочет выдохнуть, успокоиться и завершить день мягко."
          }
        ]
      }
    }
  }
};

const locationTitleMap = {
  "Бассейн": "pool",
  "Большой бассейн": "large_pool",
  "Дорожка для персональной работы": "personal_lane",
  "Аквазона": "aqua_zone",
  "Малый бассейн": "small_pool",
  "Учебный бассейн": "learning_pool",
  "Тренажёрный зал": "gym_hall",
  "Спортивный зал": "sports_hall",
  "Персональная зона": "personal_zone",
  "Универсальный зал": "universal_hall",
  "Йога-зал": "yoga_hall",
  "Зал мягких практик": "soft_practice_hall",
  "Тихий зал": "quiet_hall",
  "Сауна с малым бассейном": "sauna_pool",
  "Лаунж-зона": "lounge_zone",
  "Сауна и спа": "sauna_pool",
  "Стэп-зал": "step_hall",
  "Шэйп-зал": "shape_hall"
};

const locationPanels = {
  pool: {
    title: "Бассейн",
    lead: "Ключевая водная локация центра для плавания, мягких тренировок, акваформатов и детских занятий.",
    heroImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Свободное плавание в удобные часы",
      "Групповые водные занятия с тренером",
      "Персональные тренировки в бассейне",
      "Аквааэробика и специальные форматы для беременных",
      "Детские группы и обучение"
    ],
    relatedDirections: [{ key: "water", label: "Водная зона" }],
    activities: [
      { time: "09:30", name: "Аквааэробика", day: "Вт / Чт / Сб", location: "Бассейн", details: "Ритмичный водный класс для тех, кому нужен тонус и мягкая разгрузка суставов." },
      { time: "16:00", name: "Детская группа", day: "Будни", location: "Бассейн", details: "Учебный формат для уверенности в воде, дисциплины и базовой техники движения." },
      { time: "20:00", name: "Свободное плавание", day: "Ежедневно", location: "Бассейн", details: "Спокойный вечерний слот для собственного ритма, восстановления и мягкой нагрузки." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  large_pool: {
    title: "Большой бассейн",
    lead: "Основная водная локация для групповых форматов и тех тренировок, где важны ритм, пространство и визуальный контроль тренера.",
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Групповые занятия по расписанию",
      "Дорожки с понятным распределением потоков",
      "Тренировки для взрослых и регулярных посетителей"
    ],
    relatedDirections: [{ key: "water", label: "Водная зона" }],
    activities: [
      { time: "09:15", name: "Групповое занятие в воде", day: "Пн / Ср / Пт", location: "Большой бассейн", details: "Собранный водный формат с понятной структурой и ровным тренировочным ритмом." },
      { time: "19:45", name: "Группа для взрослых", day: "Сб", location: "Большой бассейн", details: "Формат выходного дня с акцентом на технику, выносливость и уверенность в воде." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  personal_lane: {
    title: "Индивидуальная дорожка",
    lead: "Спокойная водная зона для персональной работы, где можно выстроить точный ритм тренировки и не терять концентрацию.",
    heroImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Персональные тренировки 1:1",
      "Техника плавания и корректировка движений",
      "Гибкие слоты под индивидуальную задачу"
    ],
    relatedDirections: [{ key: "water", label: "Водная зона" }],
    activities: [
      { time: "10:00", name: "Персональная тренировка", day: "По записи", location: "Индивидуальная дорожка", details: "Точный персональный слот под технику, уверенность в воде и индивидуальный прогресс." },
      { time: "19:00", name: "Вечерний персональный слот", day: "По записи", location: "Индивидуальная дорожка", details: "Гибкое окно под спокойную нагрузку, восстановление или точечную техническую работу." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  aqua_zone: {
    title: "Аквазона",
    lead: "Ритмичная водная зона для динамичных классов, где важны мягкая нагрузка, темп и хорошее ощущение тела в воде.",
    heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Аквааэробика в удобном темпе",
      "Мягкие форматы без ударной нагрузки",
      "Вечерние и дневные водные классы"
    ],
    relatedDirections: [{ key: "water", label: "Водная зона" }],
    activities: [
      { time: "11:00", name: "Аквааэробика", day: "Вт / Чт", location: "Аквазона", details: "Средний темп и хорошая динамика для регулярной разгрузки и тонуса." },
      { time: "17:15", name: "Аквааэробика после работы", day: "Пн / Ср", location: "Аквазона", details: "Вечерний класс для тех, кто хочет снять напряжение и сохранить тренировочный эффект." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  small_pool: {
    title: "Малый бассейн",
    lead: "Более камерная водная локация с мягким ритмом, подходящая для деликатных форматов и спокойной нагрузки.",
    heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Бережные занятия в спокойной воде",
      "Форматы для беременных и мягкого восстановления",
      "Небольшие группы и деликатный ритм"
    ],
    relatedDirections: [{ key: "water", label: "Водная зона" }, { key: "recovery", label: "Оздоровление и восстановление" }],
    activities: [
      { time: "10:30", name: "Вода для беременных", day: "Вт / Пт", location: "Малый бассейн", details: "Мягкое занятие с комфортной нагрузкой, дыханием и спокойным темпом." },
      { time: "17:00", name: "Вечерняя мягкая практика", day: "Пн", location: "Малый бассейн", details: "Небольшая группа для ощущение лёгкости, плавного движения и внутреннего спокойствия." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  learning_pool: {
    title: "Учебный бассейн",
    lead: "Безопасное пространство для детских групп и обучения, где важны видимость, понятная организация и спокойный вход в воду.",
    heroImage: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Детские группы и обучение",
      "Адаптация к воде без перегруза",
      "Наглядная работа тренера и понятный сценарий занятия"
    ],
    relatedDirections: [{ key: "water", label: "Водная зона" }],
    activities: [
      { time: "16:00", name: "Детская группа 6+", day: "Пн / Ср", location: "Учебный бассейн", details: "Формат для адаптации к воде, дисциплины и первых уверенных движений." },
      { time: "17:00", name: "Детская техника плавания", day: "Вт / Чт", location: "Учебный бассейн", details: "Занятие с акцентом на координацию, дыхание и правильную механику движения." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  sports_hall: {
    title: "Спортивный зал",
    lead: "Просторная универсальная площадка для активных форматов, функциональной работы и групповых сценариев в общем ритме.",
    heroImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Функциональные тренировки",
      "Большие групповые форматы",
      "Детские секции и динамичные классы"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }],
    activities: [
      { time: "09:00", name: "Функциональная группа", day: "Пн / Ср / Пт", location: "Спортивный зал", details: "Групповой класс с ясной структурой и активным, но управляемым темпом." },
      { time: "19:00", name: "Вечерняя тренировка", day: "Вт / Чт", location: "Спортивный зал", details: "Сильная вечерняя динамика для тех, кто любит работать в общем ритме." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  step_hall: {
    title: "Стэп-зал",
    lead: "Камерное пространство, где важны ритм, темп и собранная энергия без визуального перегруза.",
    heroImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Стэп и динамичные фитнес-классы",
      "Малые группы в комфортном ритме",
      "Авторские занятия и точечная нагрузка"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }],
    activities: [
      { time: "12:00", name: "Стэп-класс", day: "Вт / Чт", location: "Стэп-зал", details: "Ритмичный формат для тех, кому нравится собранная энергия и ясная динамика занятия." },
      { time: "18:00", name: "Динамичный фитнес", day: "Будни", location: "Стэп-зал", details: "Вечерний класс с хорошим темпом и ощущением включённости в движение." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  yoga_hall: {
    title: "Йога-зал",
    lead: "Светлое пространство для практик, в которых важны внимание к телу, мягкость движения и внутренний фокус.",
    heroImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Йога и дыхательные практики",
      "Мягкое восстановление",
      "Небольшие группы и тишина"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }, { key: "recovery", label: "Оздоровление и восстановление" }],
    activities: [
      { time: "09:00", name: "Йога", day: "Пн / Ср / Пт", location: "Йога-зал", details: "Спокойная практика для мягкого входа в день, восстановления подвижности и внутренней собранности." },
      { time: "18:30", name: "Вечерняя йога", day: "Будни", location: "Йога-зал", details: "Размеренный вечерний класс для снятия напряжения и возврата к ровному внутреннему ритму." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  shape_hall: {
    title: "Шэйп-зал",
    lead: "Камерное пространство для аккуратной работы с телом, где точность движения важнее визуального шума и перегрузки.",
    heroImage: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Локальная силовая работа",
      "Стретчинг и баланс",
      "Форматы с точечной нагрузкой"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }, { key: "recovery", label: "Оздоровление и восстановление" }],
    activities: [
      { time: "13:30", name: "Стретчинг", day: "Вт / Чт", location: "Шэйп-зал", details: "Мягкий формат для гибкости, баланса и аккуратной работы с телом." },
      { time: "18:45", name: "Баланс и тонус", day: "Будни", location: "Шэйп-зал", details: "Неспешная практика с точечной нагрузкой и ощущением контроля над движением." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  gym_hall: {
    title: "Тренажёрный зал",
    lead: "Системная тренировочная локация для самостоятельной работы, понятной прогрессии и индивидуального темпа.",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Самостоятельные и персональные тренировки",
      "Силовая и функциональная подготовка",
      "Работа по собственному маршруту и темпу"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }],
    activities: [
      { time: "07:00", name: "Самостоятельная тренировка", day: "Ежедневно", location: "Тренажёрный зал", details: "Утреннее окно для собственного темпа, собранной нагрузки и ясного начала дня." },
      { time: "17:30", name: "Персональная тренировка", day: "По записи", location: "Тренажёрный зал", details: "Индивидуальная работа с тренером под силу, выносливость и возвращение к форме." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  personal_zone: {
    title: "Персональная зона",
    lead: "Спокойная часть тренировочного пространства для точной работы 1:1, когда важны обратная связь, техника и управляемая нагрузка.",
    heroImage: "https://images.unsplash.com/photo-1518611012118-fd2a8af8a1e2?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Индивидуальные тренировки с тренером",
      "Разбор техники и точечная настройка программы",
      "Гибкие слоты под личную задачу"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }],
    activities: [
      { time: "10:30", name: "Персональный слот", day: "По записи", location: "Персональная зона", details: "Формат для тех, кому нужна точная настройка техники, темпа и программы." },
      { time: "18:15", name: "Вечер с тренером", day: "Будни", location: "Персональная зона", details: "Персональная работа после дня: качество движения и управляемая нагрузка." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  universal_hall: {
    title: "Универсальный зал",
    lead: "Большая площадка для игровых и динамичных сценариев, где важны реакция, смена темпа и живая энергия движения.",
    heroImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Игровые тренировки и командные форматы",
      "Смена темпа и соревновательный элемент",
      "Подходит для подростков и взрослых"
    ],
    relatedDirections: [{ key: "training", label: "Тренировки" }],
    activities: [
      { time: "16:30", name: "Игровая тренировка", day: "Вт / Чт", location: "Универсальный зал", details: "Динамичный сценарий для тех, кто любит игру, реакцию и живой командный ритм." },
      { time: "20:00", name: "Вечерний игровой формат", day: "Сб", location: "Универсальный зал", details: "Более свободный вечерний формат с соревновательным элементом и сменой темпа." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  soft_practice_hall: {
    title: "Зал мягких практик",
    lead: "Камерное пространство для дыхательных и восстановительных занятий, где тишина и ритм так же важны, как сама практика.",
    heroImage: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Цигун и неспешные восстановительные практики",
      "Концентрация, дыхание и мягкая координация",
      "Спокойная атмосфера без перегруза"
    ],
    relatedDirections: [{ key: "recovery", label: "Оздоровление и восстановление" }],
    activities: [
      { time: "10:30", name: "Цигун", day: "Вт / Чт", location: "Зал мягких практик", details: "Неспешная практика для дыхания, устойчивости и мягкого восстановления ресурса." },
      { time: "17:45", name: "Вечерний цигун", day: "Пн / Ср", location: "Зал мягких практик", details: "Вечерний формат для снижения перегрузки и перехода в более спокойный ритм." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  quiet_hall: {
    title: "Тихий зал",
    lead: "Спокойное пространство для деликатных занятий, где важны опора, мягкость и ощущение безопасности в процессе практики.",
    heroImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Йога для беременных",
      "Мягкая поддерживающая практика",
      "Комфортный ритм и камерная атмосфера"
    ],
    relatedDirections: [{ key: "recovery", label: "Оздоровление и восстановление" }],
    activities: [
      { time: "11:00", name: "Йога для беременных", day: "Вт / Пт", location: "Тихий зал", details: "Бережный класс с акцентом на дыхание, комфорт и спокойную подвижность." },
      { time: "16:00", name: "Поддерживающая практика", day: "Ср", location: "Тихий зал", details: "Формат для сохранения лёгкости, устойчивости и внутреннего спокойствия." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  sauna_pool: {
    title: "Сауна с малым бассейном",
    lead: "Тёплая восстановительная локация для расслабления после активности, снятия напряжения и спокойного завершения визита.",
    heroImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Сауна и мягкое тепловое восстановление",
      "Малый бассейн для спокойного ритма",
      "Пространство для паузы после тренировки"
    ],
    relatedDirections: [{ key: "relax", label: "Релакс" }],
    activities: [
      { time: "10:00", name: "Свободное посещение сауны", day: "Ежедневно", location: "Сауна", details: "Дневной слот для восстановления, тепла и размеренного отдыха после активности." },
      { time: "19:00", name: "Вечерний релакс-слот", day: "Ежедневно", location: "Сауна", details: "Вечернее окно для мягкого расслабления, снятия мышечного напряжения и ощущения паузы." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  },
  lounge_zone: {
    title: "Лаунж-зона",
    lead: "Камерное пространство для тихого отдыха, мягкой разгрузки и внутреннего выдоха после активной части визита.",
    heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
    highlightsHint: "Ключевые сценарии использования пространства",
    highlights: [
      "Неспешный отдых без спешки",
      "Мягкое переключение после нагрузки",
      "Подходит для самостоятельного спокойного визита"
    ],
    relatedDirections: [{ key: "relax", label: "Релакс" }],
    activities: [
      { time: "11:30", name: "Дневной релакс", day: "Ежедневно", location: "Лаунж-зона", details: "Спокойный слот для восстановления ритма, отдыха и мягкого переключения." },
      { time: "18:30", name: "Вечерняя пауза", day: "Будни", location: "Лаунж-зона", details: "Неспешный вечерний сценарий для тех, кто хочет выдохнуть и завершить день мягко." }
    ],
    scheduleCta: "Расписание по локации",
    bookingLabel: "Записаться"
  }
};

let activePanelTrigger = null;
let activeScenarioKey = null;
let activeScenarioFormat = null;
let activeLocationKey = null;
let activeScheduleFilter = null;

function resolveAssetUrl(url) {
  if (!url || !url.includes("images.unsplash.com/")) return url;

  const [baseUrl, queryString = ""] = url.split("?");
  const fileName = baseUrl.split("/").pop();
  const params = new URLSearchParams(queryString);
  const width = params.get("w");

  if (!fileName || !width) return url;
  return `assets/images/remote/${fileName}-w${width}.jpg`;
}

function syncPanelVariant() {
  if (!directionPanel) return;
  const hideWaterLocationTail = activeScenarioKey === "water"
    && ["free", "group", "personal", "aqua", "pregnancy", "kids"].includes(activeScenarioFormat)
    && !activeLocationKey;
  directionPanel.classList.toggle("is-water-scenario-compact", hideWaterLocationTail);
}

function getActiveScenario() {
  if (!activeScenarioKey) return null;
  return scenarioPanels[activeScenarioKey] || null;
}

function getActiveScenarioFormat() {
  const scenario = getActiveScenario();
  if (!scenario || !scenario.formats || !activeScenarioFormat) return null;
  return scenario.formats[activeScenarioFormat] || null;
}

function getActiveLocation() {
  if (!activeLocationKey) return null;
  return locationPanels[activeLocationKey] || null;
}

function smoothScrollTo(element) {
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncScheduleEmptyStates() {
  document.querySelectorAll(".day-panel").forEach((panel) => {
    const emptyState = panel.querySelector("[data-schedule-empty]");
    if (!emptyState) return;
    const hasVisibleItems = [...panel.querySelectorAll("[data-schedule-item]")].some((item) => !item.hidden);
    emptyState.hidden = hasVisibleItems;
  });

  const weekEmptyState = document.querySelector("[data-week-empty]");
  if (!weekEmptyState) return;

  const hasVisibleWeekRows = [...document.querySelectorAll("[data-week-row]")].some((row) => !row.hidden);
  weekEmptyState.hidden = hasVisibleWeekRows;
}

function applyScheduleFilter(filterKey = null) {
  activeScheduleFilter = filterKey;

  document.querySelectorAll("[data-schedule-item], [data-week-row]").forEach((item) => {
    if (!filterKey) {
      item.hidden = false;
      return;
    }

    item.hidden = item.dataset.scheduleFormat !== filterKey;
  });

  if (scheduleFilterBar) {
    scheduleFilterBar.hidden = !filterKey;
  }

  if (scheduleFilterTitle && filterKey) {
    scheduleFilterTitle.textContent = scheduleFilterLabels[filterKey] || filterKey;
  }

  syncScheduleEmptyStates();
}

function showWeeklyScheduleForFilter(filterKey) {
  applyScheduleFilter(filterKey);
  smoothScrollTo(weeklyOverviewCard || scheduleSection);
}

function renderScenarioChips() {
  const scenario = getActiveScenario();
  if (!scenarioChipRow || !scenario?.formats) return;

  scenarioChipRow.innerHTML = Object.entries(scenario.formats).map(([key, format]) => `
    <button
      class="scenario-chip${key === activeScenarioFormat ? " active" : ""}"
      type="button"
      data-scenario-chip="${key}"
      role="tab"
      aria-selected="${String(key === activeScenarioFormat)}"
    >${format.label}</button>
  `).join("");

  scenarioChipRow.querySelectorAll("[data-scenario-chip]").forEach((button) => {
    button.addEventListener("click", () => {
      activeScenarioFormat = button.dataset.scenarioChip;
      renderScenarioPanel();
    });
  });
}

function renderScenarioSchedule(schedule) {
  if (!scenarioScheduleList) return;

  scenarioScheduleList.innerHTML = schedule.map((item, index) => `
    <button class="scenario-schedule-card" type="button" data-scenario-schedule="${index}">
      <span class="scenario-schedule-time">${item.time}</span>
      <span class="scenario-schedule-main">
        <span class="scenario-schedule-name">${item.name}</span>
        <span class="scenario-schedule-meta">${item.day} · ${item.location}</span>
      </span>
      <span class="scenario-schedule-link">Подробнее →</span>
    </button>
  `).join("");

  scenarioScheduleList.querySelectorAll("[data-scenario-schedule]").forEach((button) => {
    button.addEventListener("click", () => {
      const scheduleIndex = Number(button.dataset.scenarioSchedule);
      openMiniModal(schedule[scheduleIndex]);
    });
  });
}

function renderScenarioTrainers(trainers) {
  if (!scenarioTrainersSection || !scenarioTrainersGrid) return;

  const shouldShowWaterTrainers = activeScenarioKey === "water" && ["group", "personal", "aqua", "pregnancy", "kids"].includes(activeScenarioFormat);
  if (!shouldShowWaterTrainers) {
    scenarioTrainersSection.hidden = true;
    scenarioTrainersGrid.innerHTML = "";
    return;
  }

  if (!trainers || trainers.length === 0) {
    scenarioTrainersSection.hidden = true;
    scenarioTrainersGrid.innerHTML = "";
    return;
  }

  scenarioTrainersSection.hidden = false;
  scenarioTrainersGrid.innerHTML = trainers.map((trainer) => `
    <article class="scenario-trainer-card">
      <div class="scenario-trainer-photo" data-initials="${trainer.initials || "Т"}" aria-hidden="true"></div>
      <div class="scenario-trainer-body">
        <h3 class="scenario-trainer-name">${trainer.name}</h3>
        <div class="scenario-trainer-role">${trainer.role}</div>
        <button class="scenario-trainer-link" type="button">Подробнее</button>
      </div>
    </article>
  `).join("");
}

function renderScenarioPanel() {
  const scenario = getActiveScenario();
  const format = getActiveScenarioFormat();

  if (!scenario || !format || !panelLead || !scenarioHeroMedia || !scenarioLocationMedia || !scenarioLocationTitle || !scenarioLocationDescription || !scenarioLocationLink || !scenarioScheduleMeta || !scenarioFormatHint) return;

  panelLead.textContent = format.atmosphere;
  scenarioFormatHint.textContent = scenario.formatHint || "Выберите формат, чтобы уточнить содержание";
  scenarioHeroMedia.style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 32, .1), rgba(15, 23, 32, .22)), url("${resolveAssetUrl(format.heroImage)}")`;
  scenarioLocationMedia.style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 32, .06), rgba(15, 23, 32, .12)), url("${resolveAssetUrl(format.location.image)}")`;
  scenarioLocationTitle.textContent = format.location.title;
  scenarioLocationDescription.textContent = format.location.description;
  if (activeScenarioKey === "water") {
    scenarioLocationTitle.textContent = "Бассейн";
  }
  scenarioLocationLink.textContent = format.location.cta;
  scenarioLocationLink.hidden = false;
  scenarioScheduleMeta.textContent = `Формат: ${format.label}`;

  syncPanelVariant();
  renderScenarioChips();
  renderScenarioSchedule(format.schedule);
  renderScenarioTrainers(format.trainers);
}

function renderLocationActivities(activities) {
  if (!locationActivitiesList) return;

  locationActivitiesList.innerHTML = activities.map((item, index) => `
    <button class="scenario-schedule-card" type="button" data-location-activity="${index}">
      <span class="scenario-schedule-time">${item.time}</span>
      <span class="scenario-schedule-main">
        <span class="scenario-schedule-name">${item.name}</span>
        <span class="scenario-schedule-meta">${item.day} · ${item.location}</span>
      </span>
      <span class="scenario-schedule-link">Подробнее →</span>
    </button>
  `).join("");

  locationActivitiesList.querySelectorAll("[data-location-activity]").forEach((button) => {
    button.addEventListener("click", () => {
      const activityIndex = Number(button.dataset.locationActivity);
      openMiniModal(activities[activityIndex]);
    });
  });
}

function renderLocationPanel() {
  const location = getActiveLocation();
  if (!location || !locationLead || !locationHeroMedia || !locationHighlights || !locationRelatedDirections || !locationActivitiesMeta || !panelScheduleAction || !panelBookingAction) return;

  locationHighlightsHint.textContent = location.highlightsHint || "Ключевые сценарии использования пространства";
  locationLead.textContent = location.lead;
  locationHeroMedia.style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 32, .08), rgba(15, 23, 32, .18)), url("${resolveAssetUrl(location.heroImage)}")`;
  locationHighlights.innerHTML = location.highlights.map((item) => `<div class="location-highlight-item">${item}</div>`).join("");
  locationActivitiesMeta.textContent = "По этой локации";
  panelScheduleAction.textContent = location.scheduleCta || "Расписание по локации";
  panelBookingAction.textContent = location.bookingLabel || "Записаться";

  locationRelatedDirections.innerHTML = location.relatedDirections.map((direction) => `
    <button class="location-direction-chip" type="button" data-related-direction="${direction.key}">${direction.label}</button>
  `).join("");

  locationRelatedDirections.querySelectorAll("[data-related-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      syncDirectionPanel(button.dataset.relatedDirection);
    });
  });

  syncPanelVariant();
  renderLocationActivities(location.activities);
}

function syncGenericPanelContent(content) {
  if (!panelGenericLead || !panelOutline) return;
  panelGenericLead.textContent = content.lead;
  panelOutline.innerHTML = (content.outline || []).map((item) => `<div>${item}</div>`).join("");
}

function syncDirectionPanel(directionKey) {
  const content = scenarioPanels[directionKey];
  if (!content || !panelKicker || !panelTitle || !panelScheduleAction || !panelBookingAction) return;

  panelKicker.textContent = content.kicker;
  panelTitle.textContent = content.title;
  panelScheduleAction.textContent = content.scheduleCta || "Смотреть полное расписание";
  panelBookingAction.textContent = content.bookingLabel;
  activeLocationKey = null;

  if (content.formats) {
    activeScenarioKey = directionKey;
    activeScenarioFormat = Object.keys(content.formats)[0];
    if (panelScenarioView) panelScenarioView.hidden = false;
    if (panelLocationView) panelLocationView.hidden = true;
    if (panelGenericView) panelGenericView.hidden = true;
    renderScenarioPanel();
    return;
  }

  activeScenarioKey = null;
  activeScenarioFormat = null;
  if (panelScenarioView) panelScenarioView.hidden = true;
  if (panelLocationView) panelLocationView.hidden = true;
  if (panelGenericView) panelGenericView.hidden = false;
  syncPanelVariant();
  syncGenericPanelContent(content);
}

function syncLocationPanel(locationKey) {
  const content = locationPanels[locationKey];
  if (!content || !panelKicker || !panelTitle) return;

  activeScenarioKey = null;
  activeScenarioFormat = null;
  activeLocationKey = locationKey;
  panelKicker.textContent = "Локация";
  panelTitle.textContent = content.title;

  if (panelScenarioView) panelScenarioView.hidden = true;
  if (panelGenericView) panelGenericView.hidden = true;
  if (panelLocationView) panelLocationView.hidden = false;

  syncPanelVariant();
  renderLocationPanel();
}

function closeMiniModal() {
  if (!panelMiniModal || !panelMiniBackdrop) return;
  panelMiniModal.classList.remove("is-open");
  panelMiniModal.setAttribute("aria-hidden", "true");
  panelMiniBackdrop.classList.remove("is-open");
  panelMiniBackdrop.hidden = true;
}

function openMiniModal(scheduleItem) {
  if (!scheduleItem || !panelMiniModal || !panelMiniBackdrop || !miniModalTitle || !miniModalTime || !miniModalName || !miniModalDay || !miniModalLocation || !miniModalDescription) return;

  miniModalTitle.textContent = scheduleItem.name;
  miniModalTime.textContent = scheduleItem.time;
  miniModalName.textContent = scheduleItem.name;
  miniModalDay.textContent = scheduleItem.day;
  miniModalLocation.textContent = scheduleItem.location;
  miniModalDescription.textContent = scheduleItem.details;

  panelMiniBackdrop.hidden = false;
  panelMiniBackdrop.classList.add("is-open");
  panelMiniModal.classList.add("is-open");
  panelMiniModal.setAttribute("aria-hidden", "false");
  panelMiniClose?.focus();
}

function closePanel() {
  if (!directionPanel || !panelBackdrop) return;
  closeMiniModal();
  activeLocationKey = null;
  directionPanel.classList.remove("is-open");
  directionPanel.setAttribute("aria-hidden", "true");
  panelBackdrop.classList.remove("is-open");
  panelBackdrop.hidden = true;
  syncPanelVariant();
  document.body.classList.remove("panel-open");
  if (activePanelTrigger) activePanelTrigger.focus();
}

function openPanel(trigger) {
  if (!trigger || !directionPanel || !panelBackdrop) return;
  activePanelTrigger = trigger;
  if (trigger.dataset.panelType === "location") {
    syncLocationPanel(trigger.dataset.location);
  } else {
    syncDirectionPanel(trigger.dataset.direction);
  }
  panelBackdrop.hidden = false;
  panelBackdrop.classList.add("is-open");
  directionPanel.classList.add("is-open");
  directionPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
  panelClose?.focus();
}

panelScheduleAction?.addEventListener("click", () => {
  const isFreeSwimming = activeScenarioKey === "water" && activeScenarioFormat === "free";
  closePanel();

  if (isFreeSwimming) {
    showWeeklyScheduleForFilter("free-swimming");
    return;
  }

  applyScheduleFilter(null);
  smoothScrollTo(scheduleSection);
});

panelBookingAction?.addEventListener("click", () => {
  closePanel();
  smoothScrollTo(document.getElementById("contacts"));
});

scheduleFilterClear?.addEventListener("click", () => {
  applyScheduleFilter(null);
  smoothScrollTo(scheduleSection);
});

document.querySelectorAll("[data-panel-trigger]").forEach((card) => {
  card.addEventListener("click", () => openPanel(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel(card);
    }
  });
});

panelClose?.addEventListener("click", closePanel);
panelBackdrop?.addEventListener("click", closePanel);
panelMiniClose?.addEventListener("click", closeMiniModal);
panelMiniBackdrop?.addEventListener("click", closeMiniModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && panelMiniModal?.classList.contains("is-open")) {
    closeMiniModal();
    return;
  }

  if (event.key === "Escape" && directionPanel?.classList.contains("is-open")) {
    closePanel();
  }
});

scenarioLocationLink?.addEventListener("click", () => {
  const format = getActiveScenarioFormat();
  if (!format) return;
  const locationKey = activeScenarioKey === "water"
    ? "pool"
    : (format.location.key || locationTitleMap[format.location.title]);
  if (!locationKey) return;
  syncLocationPanel(locationKey);
});

applyScheduleFilter(null);
