import { alarmTC } from "./alarm";
import { calendarTC } from "./calendar";
import { projectTC } from "./project";
import { pomodoroTC } from "./pomodoro";
import { userTC } from "./user";
import { notificationTC } from "./notification";
import { groupTC } from "./group";
import { resourceTC } from "./resource";
import { eventTC } from "./event";
import { schemaComposer } from "graphql-compose";

alarmTC.addRelation("Attendees", {
  resolver: () => schemaComposer.getOTC("User").getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.attendees,
  },
  projection: {
    attendees: true,
  },
});

calendarTC.addRelation("Events", {
  resolver: () => eventTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.events,
  },
  projection: {
    events: true,
  },
});

groupTC.addRelation("Calendar", {
  resolver: () => calendarTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.calendar,
  },
  projection: {
    calendar: true,
  },
});

groupTC.addRelation("Users", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.members,
  },
  projection: {
    members: true,
  },
});
groupTC.addRelation("Resources", {
  resolver: () => resourceTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.resources,
  },
  projection: {
    resources: true,
  },
});

pomodoroTC.addRelation("Event", {
  resolver: () => eventTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.event,
  },
  projection: {
    event: true,
  },
});

projectTC.addRelation("Pm", {
  resolver: () => userTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.pm_id,
  },
  projection: {
    pm_id: true,
  },
});
projectTC.addRelation("Members", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.members,
  },
  projection: {
    members: true,
  },
});
projectTC.addRelation("Group", {
  resolver: () => groupTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.group_id,
  },
  projection: {
    group_id: true,
  },
});

resourceTC.addRelation("Calendar", {
  resolver: () => calendarTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.calendar,
  },
  projection: {
    calendar: true,
  },
});

resourceTC.addRelation("Owners", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.owners,
  },
  projection: {
    owners: true,
  },
});

userTC.addRelation("OwnedResources", {
  resolver: () => resourceTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.owned_resources,
  },
  projection: {
    owned_resources: true,
  },
});

userTC.addRelation("Alarms", {
  resolver: () => alarmTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.alarms,
  },
  projection: {
    alarms: true,
  },
});

userTC.addRelation("Pomodoros", {
  resolver: () => pomodoroTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.pomodoros,
  },
  projection: {
    pomodoros: true,
  },
});

userTC.addRelation("Notifications", {
  resolver: () => notificationTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.notifications,
  },
  projection: {
    notifications: true,
  },
});

userTC.addRelation("Groups", {
  resolver: () => groupTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.groups,
  },
  projection: {
    groups: true,
  },
});

userTC.addRelation("PrivateCalendar", {
  resolver: () => calendarTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.private_calendar,
  },
  projection: {
    private_calendar: true,
  },
});

userTC.addRelation("PublicCalendar", {
  resolver: () => calendarTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.public_calendar,
  },
  projection: {
    public_calendar: true,
  },
});

userTC.addRelation("Projects", {
  resolver: () => projectTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.projects,
  },
  projection: {
    projects: true,
  },
});
