import './chatBubbles.css';
import { Block } from 'core';
import { Bubble, BubbleProps } from 'components/bubble';
import { BubbleGroup, BubbleGroupProps } from 'components/bubble-group';

export interface ChatBubblesProps extends Props {
    bubbleGroupProps?: BubbleGroupProps[],
}

type DayItem = { day: string, i: number };

export default class ChatBubbles extends Block<ChatBubblesProps> {
    static readonly componentName = 'ChatBubbles';

    private _groupBubblesByDay(bubbles: BubbleProps[]): BubbleGroupProps[] {
        const bubblesAsDayItems: DayItem[] = bubbles.map((bubble, i) => ({
            day: bubble.date.toLocaleDateString(), i,
        }));

        const lastDayItems = this._getLastDayItems(bubblesAsDayItems);

        const groups: BubbleGroupProps[] = [];

        lastDayItems.forEach((lastDayItem, index, self) => {
            const start = index > 0 ? self[index - 1].i + 1 : 0;

            groups.push({
                bubbleProps: bubbles.slice(start, lastDayItem.i + 1),
                bubblesDate: lastDayItem.day,
            });
        });

        return groups;
    }

    private _getLastDayItems(dayItems: DayItem[]) {
        return dayItems
            .map((item) => item.day)
            .reduce((res, day, _, self) => {
                const lastItem = dayItems
                    .find((item) => self.lastIndexOf(day) === item.i);

                const isUnique = lastItem && !res
                    .find((item) => item.i === lastItem.i && item.day === lastItem.day);

                return isUnique ? [...res, lastItem] : res;
            }, [] as DayItem[]);
    }

    private _getCurrentBubbleProps(): BubbleProps[] {
        const refs = this.getRefs<BubbleGroup>(this.refs.bubbleGroupsRef);

        if (refs !== undefined && refs.length > 0) {
            return refs
                .reduce((a, b) => a.concat(b.getBubbles()!), [] as Bubble[])
                .map((bubble) => bubble.getProps());
        }

        return [];
    }

    updateBubbles(bubbleProps: BubbleProps[], isOld: boolean) {
        const currentProps = this._getCurrentBubbleProps();

        const nextProps = isOld
            ? bubbleProps.concat(currentProps)
            : currentProps.concat(bubbleProps);

        this.setProps({
            bubbleGroupProps: this._groupBubblesByDay(nextProps),
        });
    }

    getGroups() {
        return this.getRefs<BubbleGroup>(this.refs.bubbleGroupsRef);
    }

    protected render() {
        // language=hbs
        return `
        <div class="chat__bubbles">
            {{#each bubbleGroupProps}}
                {{#with this}}
                    {{{BubbleGroup
                        ref="bubbleGroupsRef" 
                        bubblesDate=bubblesDate
                        bubbleProps=bubbleProps
                        last=last
                    }}}
                {{/with}}
            {{/each}}
        </div>
    `;
    }
}
