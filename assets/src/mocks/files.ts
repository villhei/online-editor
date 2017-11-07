import { TextDocument } from 'service/document-service'

export const MOCK_FILES: TextDocument[] = [
    {
        name: 'TODO.md',
        owner: 'foo',
        content:
`
TODO
* Implement a super app

EPICS
* App should support multi-cursor
* App should support markdown publish
* App should support user accounts
`
    },
    {
        name: 'Shopping list',
        owner: 'foo',
        content:
        `
* Eggs
* Chicken
* Milk
* Bread
* Butter
* Bacon
* More bacon
`
    },
    {
        name: 'Meeting memo.md',
        owner: 'bar',
        content:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis rhoncus est, ut dictum mauris auctor sit amet. Aliquam dictum dapibus ligula, et ornare neque ultrices non. Sed rhoncus ipsum dui, ac pharetra ipsum ultrices id. Proin facilisis condimentum nunc, eget elementum tortor auctor ut. Nam eros neque, accumsan quis facilisis vel, gravida a enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tristique varius porta. In tempor, odio nec rhoncus suscipit, mi magna tempor nisl, eget pellentesque velit nunc at tortor. Aliquam ornare enim sit amet dictum laoreet.

Donec consequat consequat augue at euismod. Proin posuere nisl ut bibendum consectetur. Aliquam a interdum metus, quis posuere felis. Pellentesque vitae ornare nibh. Curabitur libero massa, congue sed arcu eget, cursus egestas sapien. Aenean sit amet congue tellus, at feugiat nisl. Aliquam eu turpis urna. Curabitur feugiat metus mauris, non volutpat nunc porttitor in. Duis ut sodales magna, eu aliquam lorem. Maecenas dapibus sodales vehicula. Quisque pharetra vestibulum tempus. Etiam quis maximus risus, sit amet hendrerit tortor. Ut sit amet augue elit. Morbi mollis id quam et ullamcorper. Nam luctus blandit neque, vitae pulvinar erat ornare non. Praesent tristique bibendum ullamcorper.

Aenean suscipit aliquam odio non bibendum. Fusce pretium mattis dolor, eget blandit neque sodales sit amet. Fusce bibendum enim nec nulla fringilla, at gravida nulla maximus. Fusce id pulvinar neque. Sed neque felis, hendrerit vulputate consectetur at, tempus non libero. Praesent porta mi eu velit ultricies, eu volutpat dolor consectetur. Suspendisse sit amet nibh eu quam feugiat facilisis ac nec tortor. Fusce quis consectetur nulla. Cras eu risus nisi.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac porta nisi. Donec urna nunc, tempor vitae posuere ut, cursus at eros. In hendrerit dolor sed magna suscipit, in placerat tellus imperdiet. Integer volutpat arcu lectus. Aenean ut vulputate lacus, vitae efficitur mi. Donec vulputate, augue vel ultrices volutpat, lorem sapien posuere nulla, sit amet gravida purus lorem in lorem. Duis leo augue, ullamcorper nec diam vitae, tincidunt hendrerit dolor. Quisque a ullamcorper dui. Suspendisse potenti. Mauris ornare ante risus, vitae rutrum metus commodo quis.
`
    },
    {
        name: 'fizzbuzz.js',
        owner: 'quux',
        content:
        `
for (var i=1; i <= 20; i++)
{
    if (i % 15 == 0)
        console.log("FizzBuzz");
    else if (i % 3 == 0)
        console.log("Fizz");
    else if (i % 5 == 0)
        console.log("Buzz");
    else
        console.log(i);
}`
    }
].map((partialDocument, index) => {
    return {
        ...partialDocument,
        id: Math.random().toString(36).substring(16),
        inserted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
})