alter table "m2"."conversations" add foreign key ("block_id") references "m2"."blocks"("id") on update restrict on delete restrict;
