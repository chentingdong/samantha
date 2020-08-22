alter table "chat"."user_room_participations"
    add constraint "user_room_participations_pkey" 
    primary key ( "user_id", "room_id" );
