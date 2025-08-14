import { request, APIResponse, expect } from '@playwright/test';
import { testData } from './testData';

export class apiHelpers {

    static async verifyStatusCode(response: APIResponse): Promise<void> {
        await expect(response, `200 Status code was not displayed.`).toBeOK();
    }
 
    static async getNewDeck(deckCount: number): Promise<APIResponse> {
        const apiContext = await request.newContext();
        const response = await apiContext.get(`${testData.deckOfCardsUrl}api/deck/new/shuffle/`, {
            params: {
                deck_count: deckCount
            }
        });
        return response;
    }

    static async shuffleCards(deckId: number): Promise<APIResponse> {
        const apiContext = await request.newContext();
        const response = await apiContext.get(`${testData.deckOfCardsUrl}api/deck/${deckId}/shuffle/`);
        return response;
    }

    static async dealCards(deckId: number, cardCount: number): Promise<APIResponse> {
        const apiContext = await request.newContext();
        const response = await apiContext.get(`${testData.deckOfCardsUrl}api/deck/${deckId}/draw/`, {
            params: {
                count: cardCount
            }
        });
        return response;
    }
}

export async function verifyDeckCount(deckCount: number, remainingcards: number) {
    expect(remainingcards).toBe(deckCount * 52);
}

export async function isTwentyOne(cards: string[]): Promise<boolean> {
    // Convert a card string to numeric values
    const getValue = (card: string): number[] => {
        switch (card.toUpperCase()) {
            case 'JACK':
                return [12];
            case 'QUEEN':
                return [13];
            case 'KING':
                return [14];
            case 'ACE':
                return [1, 11];
            default:
                return [parseInt(card, 10)];
        }
    };

    // Convert all cards to numeric values
    const allValues = cards.map(getValue);

    // Try all combinations
    const tryCombos = (values: number[][], idx = 0, sum = 0): boolean => {
        if (idx === values.length) {
            return sum === 21;
        }
        for (const v of values[idx]) {
            if (tryCombos(values, idx + 1, sum + v)) {
                return true;
            }
        }
        return false;
    };

    return tryCombos(allValues);
}

export async function isBlackjack(blackjack: boolean): Promise<string> {
    if (blackjack) {
        return "Congratulations, you've got Blackjack!";
    }
    return "You'll get it next time.";
}

export async function dealcardsAndCheckIfThePlayerGotBlackjack(deckId: any, cardCount: number): Promise<string> {
        const response = await apiHelpers.dealCards(deckId, cardCount);
        const body = await response.json();
        const values: string [] = body.cards.map((card: any) => card.value);
        console.log(values);
        let blackjack = await isTwentyOne(values);
        return await isBlackjack(blackjack);
}