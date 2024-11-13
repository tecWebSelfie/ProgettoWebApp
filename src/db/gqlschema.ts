import { schemaComposer } from "graphql-compose";
import fs from "fs";
import path from "path";
import { graphqlschema as alarmSchema, alarmTC } from "./models/alarm";
import { graphqlschema as calendarSchema, calendarTC } from "./models/calendar";
import { graphqlschema as eventSchema, eventTC } from "./models/event";
import { graphqlschema as groupSchema, groupTC } from "./models/group";
//import * as journalModel from "./models/journal";
import {
  graphqlschema as notificationSchema,
  notificationTC,
} from "./models/notification";
import { graphqlschema as pomodoroSchema, pomodoroTC } from "./models/pomodoro";
import { graphqlschema as projectSchema, projectTC } from "./models/project";
import { graphqlschema as resourceSchema, resourceTC } from "./models/resource";
//import * as todoModel from "./models/todo";
import { graphqlschema as userSchema, userTC } from "./models/user";
import { graphqlschema as todoSchema, todoTC } from "./models/todo";
import { graphqlschema as journalSchema, journalTC } from "./models/journal";
import { graphqlschema as freebusySchema, freebusyTC } from "./models/freebusy";
import {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from "graphql";
//import * as relations from "./models/relationsTmp";

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
calendarTC.addRelation("Todos", {
  resolver: () => todoTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.todos,
  },
  projection: {
    todos: true,
  },
});

eventTC.addRelation("Attendees", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.attendees,
  },
  projection: {
    attendees: true,
  },
});
eventTC.addRelation("Alarms", {
  resolver: () => alarmTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.alarms,
  },
  projection: {
    alarms: true,
  },
});
eventTC.addRelation("Pomodoro", {
  resolver: () => pomodoroTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.pomodoro,
  },
  projection: {
    pomodoro: true,
  },
});

freebusyTC.addRelation("Organizer", {
  resolver: () => userTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.organizer,
  },
  projection: {
    organizer: true,
  },
});
freebusyTC.addRelation("Attendees", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.attendees,
  },
  projection: {
    attendees: true,
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

journalTC.addRelation("Organizer", {
  resolver: () => userTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.organizer,
  },
  projection: {
    organizer: true,
  },
});
journalTC.addRelation("Attendees", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.attendees,
  },
  projection: {
    attendees: true,
  },
});
journalTC.addRelation("InTodos", {
  resolver: () => todoTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.in_todos,
  },
  projection: {
    in_todos: true,
  },
});
journalTC.addRelation("OutTodos", {
  resolver: () => todoTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.out_todos,
  },
  projection: {
    out_todos: true,
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
projectTC.addRelation("Todos", {
  resolver: () => todoTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.todos,
  },
  projection: {
    todos: true,
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
resourceTC.addRelation("Freebusy", {
  resolver: () => freebusyTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.freebusy,
  },
  projection: {
    freebusy: true,
  },
});
resourceTC.addRelation("Journals", {
  resolver: () => journalTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.journals,
  },
  projection: {
    journals: true,
  },
});

todoTC.addRelation("Organizer", {
  resolver: () => userTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.organizer,
  },
  projection: {
    organizer: true,
  },
});
todoTC.addRelation("Resources", {
  resolver: () => resourceTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.resources,
  },
  projection: {
    resources: true,
  },
});
todoTC.addRelation("Attendees", {
  resolver: () => userTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.attendees,
  },
  projection: {
    attendees: true,
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
userTC.addRelation("Freebusy", {
  resolver: () => freebusyTC.getResolver("findById"),
  prepareArgs: {
    _id: (object) => object.freebusy,
  },
  projection: {
    freebusy: true,
  },
});
userTC.addRelation("Journals", {
  resolver: () => journalTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.journals,
  },
  projection: {
    journals: true,
  },
});
userTC.addRelation("Todos", {
  resolver: () => todoTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.todos,
  },
  projection: {
    todos: true,
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

schemaComposer.addDirective(
  new GraphQLDirective({
    name: "requiresScopes",
    locations: [
      DirectiveLocation.FIELD_DEFINITION,
      DirectiveLocation.OBJECT,
      DirectiveLocation.INTERFACE,
    ],
    args: {
      scopes: {
        type: new GraphQLNonNull(
          new GraphQLList(
            new GraphQLNonNull(
              new GraphQLList(new GraphQLNonNull(GraphQLString)),
            ),
          ),
        ),
      },
    },
  }),
);

userTC.addRelation("Pomodoros", {
  resolver: () => pomodoroTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (object) => object.pomodoros,
  },
  projection: {
    pomodoros: true,
  },
});

userTC.getField("Pomodoros").directives = [
  { name: "requiresScopes", args: { scopes: ["read:user"] } },
];

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
schemaComposer.merge(freebusySchema);
schemaComposer.merge(groupSchema);
schemaComposer.merge(journalSchema);
schemaComposer.merge(notificationSchema);
schemaComposer.merge(pomodoroSchema);
schemaComposer.merge(projectSchema);
schemaComposer.merge(resourceSchema);
schemaComposer.merge(todoSchema);
schemaComposer.merge(userSchema);

schemaComposer.Subscription.addFields({
  pippo: userTC.getResolver("findById"),
});

fs.writeFileSync(
  path.join(process.cwd(), "schema.graphql"),
  schemaComposer.toSDL(),
);

export const schema = schemaComposer.buildSchema();
