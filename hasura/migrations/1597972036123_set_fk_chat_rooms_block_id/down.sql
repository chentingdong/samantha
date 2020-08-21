alter table "chat"."rooms" drop constraint "rooms_block_id_fkey",
          add constraint "rooms_block_id_fkey"
          foreign key ("block_id")
          references "m2"."blocks"
          ("id")
          on update restrict
          on delete restrict;
