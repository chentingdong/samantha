alter table "chat"."block_room_bookings" drop constraint "block_room_bookings_pkey";
alter table "chat"."block_room_bookings"
    add constraint "block_room_bookings_pkey" 
    primary key ( "id" );
