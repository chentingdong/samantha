alter table "v2"."Bell" add foreign key ("owner") references "v2"."Bellhop"("bellhop_id") on update cascade on delete cascade;
