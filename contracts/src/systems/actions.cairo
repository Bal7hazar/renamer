// Interfaces

#[dojo::interface]
trait IActions {
    fn create(ref world: IWorldDispatcher, name: felt252);
    fn rename(ref world: IWorldDispatcher, name: felt252);
}

// Contracts

#[dojo::contract]
mod actions {
    // Starknet imports

    use renamer::models::player::AssertTrait;
    use starknet::info::get_caller_address;

    // Internal imports

    use renamer::store::{Store, StoreImpl};
    use renamer::models::player::{Player, PlayerTrait, PlayerAssert};

    // Local imports

    use super::IActions;

    // Implementations

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn create(ref world: IWorldDispatcher, name: felt252,) {
            // [Setup] Datastore
            let store: Store = StoreImpl::new(world);

            // [Check] Player not already exists
            let caller = get_caller_address();
            let player = store.player(caller.into());
            player.assert_not_exists();

            // [Effect] Create a new player
            let player = PlayerTrait::new(caller.into(), name);
            store.set_player(player);
        }

        fn rename(ref world: IWorldDispatcher, name: felt252,) {
            // [Setup] Datastore
            let store: Store = StoreImpl::new(world);

            // [Check] Player exists
            let caller = get_caller_address();
            let mut player = store.player(caller.into());
            player.assert_exists();

            // [Effect] Update player
            player.rename(name);
            store.set_player(player);
        }
    }
}
