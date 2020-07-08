alter table "v2"."FormTask"
           add constraint "FormTask_assignee_fkey"
           foreign key ("assignee")
           references "v2"."User"
           ("user_id") on update cascade on delete cascade;
