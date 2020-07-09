alter table "v2"."Bell" add foreign key ("bell_id") references "v2"."Block"("block_id") on update cascade on delete cascade;
