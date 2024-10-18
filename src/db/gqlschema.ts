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
