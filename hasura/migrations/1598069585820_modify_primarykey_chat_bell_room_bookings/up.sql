alter table "chat"."bell_room_bookings"
    add constraint "bell_room_bookings_pkey" 
    primary key ( "bell_id", "room_id" );
