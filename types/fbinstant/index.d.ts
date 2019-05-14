declare class FBInstant {
    /**
     * Contains functions and properties related to the current player.
     */
    static player: FBInstant.FBPlayer;

    static context: FBInstant.Context;

    /**
     * Sets the session data to receive on the webhook
     * */
    static setSessionData(sessionData: Object): void;

    /**
     * Sends a message update
     * */
    static updateAsync(payload: Object): Promise<Object>;
}

declare namespace FBInstant {
    
    interface FBPlayer {

        /**
         * A unique identifier for the player.
         */
        getID(): string;

        /**
         * The player's localized display name.
         */
        getName(): string;

        /** 
         * A url to the player's public profile photo 
         **/
        getPhoto(): string;
        
        /**
         * Fetch the player's unique identifier along with a signature that verifies that the identifier indeed comes from Facebook without being tampered with
         */
        getSignedPlayerInfoAsync(requestPayload?: string): Promise<SignedPlayerInfo>;

        /**
         * Retrieve stats from the designated cloud storage of the current player.
         */
        getDataAsync(keys: Array<string>): Promise<Object>;

        /**
         * Set stats to be saved to the designated cloud storage of the current player.
         * */
        setDataAsync(stats: Object): Promise<any>;

        /**
         * Flushes any changes to the player data
         * */
        flushDataAsync(): Promise<boolean>;
    }

    interface Context {
        /**
         * A unique identifier for the current game context. 
         */
        getID(): string;

        /**
         * Opens a context selection dialog for the player.
         * */
        chooseAsync(options?: object): Promise<boolean>;

        /**
         *  Gets an array of #contextplayer objects containing information about active players
         *  in the current context (people who played the game in the current context in the last 90 days). 
         *  This may include the current player.
         **/
        getPlayersAsync():Promise<ContextPlayer[]>
    }

    interface SignedPlayerInfo {
        /**
         * Get the id of the player.
         */
        getPlayerID(): string;
        /**
         * A signature to verify this object indeed comes from Facebook.
         * The string is base64url encoded, using HMAC to sign your application's Sccret, based on the OAuth 2.0 specification.
         */
        getSignature(): string;

    }

    interface ContextPlayer {
         /**
         * A unique identifier for the current game context. 
         */
        getID(): string;

        /**
         * The player's localized display name.
         */
        getName(): string;

        /** 
         * A url to the player's public profile photo 
         **/
        getPhoto(): string;
    }
}