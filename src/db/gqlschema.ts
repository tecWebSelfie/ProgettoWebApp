import { schemaComposer } from "graphql-compose";

import { graphqlschema as alarmSchema } from "./models/alarm";
import { graphqlschema as calendarSchema } from "./models/calendar";
import { graphqlschema as eventSchema } from "./models/event";
import { graphqlschema as groupSchema } from "./models/group";
//import * as journalModel from "./models/journal";
import { graphqlschema as notificationSchema } from "./models/notification";
import { graphqlschema as pomodoroSchema } from "./models/pomodoro";
import { graphqlschema as projectSchema } from "./models/project";
import { graphqlschema as resourceSchema } from "./models/resource";
//import * as todoModel from "./models/todo";
import { graphqlschema as userSchema } from "./models/user";
import { getMongooseResolvers } from "./models/graphqlComposeUtilities";
//import * as relations from "./models/relationsTmp";

import { alarmTC } from "./models/alarm";
import { userTC } from "./models/user";
import { calendarTC } from "./models/calendar";
import { projectTC } from "./models/project";
import { pomodoroTC } from "./models/pomodoro";
import { notificationTC } from "./models/notification";
import { groupTC } from "./models/group";
import { resourceTC } from "./models/resource";
import { eventTC } from "./models/event";

alarmTC.addRelation("Attendees", {
  resolver: () => userTC.getResolver("findByIds"),
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

schemaComposer.merge(alarmSchema);
schemaComposer.merge(calendarSchema);
schemaComposer.merge(eventSchema);
schemaComposer.merge(groupSchema);
schemaComposer.merge(notificationSchema);
schemaComposer.merge(pomodoroSchema);
schemaComposer.merge(projectSchema);
schemaComposer.merge(resourceSchema);
schemaComposer.merge(userSchema);
export const graphqlschema = schemaComposer.buildSchema();
