
alter table "public"."Block" rename to "blocks";

alter table "public"."User" rename to "users";

alter table "public"."BlockState" rename to "block_state";

alter table "public"."BlockDefState" rename to "block_def_state";

alter table "public"."BlockType" rename to "block_type";

alter table "public"."BlockDef" rename to "blockDefs";

alter table "public"."block_def_state" rename to "blockDefState";

alter table "public"."block_state" rename to "blockState";

alter table "public"."block_type" rename to "blockType";

alter table "public"."_requestors" rename to "block_requestor";

alter table "public"."_responders" rename to "block_responder";
ALTER TABLE users RENAME CONSTRAINT "User_pkey" TO users_pkey;
ALTER TABLE blocks RENAME CONSTRAINT "Block_pkey" TO blocks_pkey;
ALTER TABLE block_responder RENAME CONSTRAINT "_responders_pkey" TO block_responders_pkey;
ALTER TABLE block_requestor RENAME CONSTRAINT "_requestors_pkey" TO block_requestors_pkey;
ALTER TABLE block_responder RENAME CONSTRAINT "_responders_block_id_fkey" TO block_responder_block_id_fkey;
ALTER TABLE block_responder RENAME CONSTRAINT "_responders_user_id_fkey" TO block_responder_user_id_fkey;
ALTER TABLE block_requestor RENAME CONSTRAINT "_requestors_user_id_fkey" TO block_requestor_user_id_fkey;
ALTER TABLE block_requestor RENAME CONSTRAINT "_requestors_block_id_fkey" TO block_requestor_block_id_fkey;
ALTER TABLE "blockType" RENAME CONSTRAINT "BlockType_pkey" TO blockType_pkey;
ALTER TABLE "blockState" RENAME CONSTRAINT "BlockState_pkey" TO blockState_pkey;
ALTER TABLE "blockDefState" RENAME CONSTRAINT "BlockDefState_pkey" TO blockdefstate_pkey;
ALTER TABLE "blockDefs" RENAME CONSTRAINT "BlockDef_pkey" TO blockDef_pkey;
ALTER TABLE "blockDefs" RENAME CONSTRAINT "blockdef_pkey" TO blockdefs_pkey;
ALTER TABLE "blockDefs" RENAME CONSTRAINT "BlockDef_state_fkey" TO blockDefState_fkey;
ALTER TABLE "blockDefs" RENAME CONSTRAINT "BlockDef_type_fkey" TO blockDefType_fkey;
ALTER TABLE "blocks" RENAME CONSTRAINT "Block_state_fkey" TO blockState_fkey;
ALTER TABLE "blocks" RENAME CONSTRAINT "Block_type_fkey" TO blockType_fkey;
