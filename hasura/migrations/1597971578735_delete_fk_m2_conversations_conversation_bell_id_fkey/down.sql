alter table "m2"."conversations" add foreign key ("bell_id") references "m2"."bells"("id") on update restrict on delete restrict;
