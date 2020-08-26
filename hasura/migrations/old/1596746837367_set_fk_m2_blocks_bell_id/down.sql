alter table "m2"."blocks" drop constraint "blocks_bell_id_fkey",
          add constraint "blocks_bell_id_fkey"
          foreign key ("bell_id")
          references "m2"."bells"
          ("id")
          on update set null
          on delete set null;
