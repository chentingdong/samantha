alter table "chat"."user_room_status" drop constraint "user_status_pkey";
alter table "chat"."user_room_status"
    add constraint "user_room_status_pkey" 
    primary key ( "id" );
