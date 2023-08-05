let arrayList = JSON.parse( localStorage.getItem( "tasks" ) ) || [];
let checkList = JSON.parse( localStorage.getItem( "tasksComplete" ) ) || [];
let list = document.getElementById( "list-input" );
let divBox = document.querySelector( ".content" );

window.onload = function ()
{
    list.focus();
    showAll();
};

function addList ( event )
{
    event.preventDefault();
    if ( list.value != '' )
    {
        arrayList.push( list.value );
        localStorage.setItem( "tasks", JSON.stringify( arrayList ) );
        showAll();
    }

}


function showAll ()
{
    divBox.innerHTML = '';
    if ( arrayList.length > 0 )
    {
        arrayList.forEach( ( value, index ) =>
        {
            let isChecked = checkList.includes( value );

            let template = `
                <div>${ value }</div>
                <input class="check-button form-check-input" type="checkbox" ${ isChecked ? "checked" : "" }>`;
            const newElement = document.createElement( 'div' );
            newElement.classList.add( "input-group", "justify-content-between", "mb-1" );
            newElement.innerHTML = template;
            if ( document.querySelector( ".input-group" ).classList.contains( "bg-white" ) )
            {
                newElement.classList.add( "bg-white" );
                newElement.classList.add( "text-dark" );
            }
            divBox.appendChild( newElement );

            let checkButton = newElement.querySelector( '.check-button' );
            checkButton.addEventListener( "change", () =>
            {
                if ( checkButton.checked )
                {
                    checkList.push( value );
                    localStorage.setItem( "tasksComplete", JSON.stringify( checkList ) );
                } else
                {
                    if ( index > -1 )
                    {
                        checkList.splice( index, 1 );
                        localStorage.setItem( "tasksComplete", JSON.stringify( checkList ) );

                    }
                }
            } );
            list.value = '';
            visibleSubject();

        } );
    }
    else divBox.innerHTML = `<div class = "backdrop">Nothing here !</div>`;

}


function showCompleteList ()
{
    divBox.innerHTML = '';
    if ( checkList.length > 0 )
    {
        checkList.forEach( ( value, index ) =>
        {
            let template = `
                <div>${ value }</div>
                <div class="delete-button"><i class="fa-solid fa-xmark"></i></div>`;
            const newElement = document.createElement( 'div' );
            newElement.classList.add( "input-group", "justify-content-between", "mb-1" );
            newElement.innerHTML = template;
            if ( document.querySelector( ".input-group" ).classList.contains( "bg-white" ) )
            {
                newElement.classList.add( "bg-white" );
                newElement.classList.add( "text-dark" );
            }
            divBox.appendChild( newElement );

            let deleteButton = newElement.querySelector( '.delete-button' );
            deleteButton.addEventListener( 'click', () =>
            {
                removeList( index, value );
            } );
            list.value = '';

        } );
    }
    else divBox.innerHTML = `<div class = "backdrop">Nothing here !</div>`;

}


function removeList ( index, eleValue )
{
    if ( index >= 0 && index < checkList.length )
    {
        // to get index of value in arrayList that like value in checklist 
        let value = arrayList.indexOf( eleValue );
        checkList.splice( index, 1 );
        arrayList.splice( value, 1 );
        localStorage.setItem( "tasks", JSON.stringify( arrayList ) );
        localStorage.setItem( "tasksComplete", JSON.stringify( checkList ) );
        showCompleteList();
    } else
    {
        console.error( `Index ${ index } is out of range` );
    }
}


// display div of All list and Completed list
function visibleSubject ()
{
    const subjectElements = document.querySelector( ".subject" );
    if ( arrayList.length > 0 )
    {
        subjectElements.classList.remove( "visually-hidden" );
        subjectElements.classList.add( "visible" );
    } else
    {
        subjectElements.classList.remove( "visible" );
        subjectElements.classList.add( "visually-hidden" );
    }
}


// change theme form dark to light and vice
function changeTheme ()
{
    document.body.classList.toggle( "bg-color" );
    document.querySelector( ".parent" ).classList.toggle( "bg-img-light" );
    document.querySelectorAll( ".input" ).forEach( ( ele ) =>
    {
        ele.classList.toggle( "bg-white" );
        ele.classList.toggle( "text-dark" );
    } );
    const inputGroups = document.querySelectorAll( ".input-group" );
    if ( inputGroups.length > 0 )
    {
        inputGroups.forEach( ( ele ) =>
        {
            ele.classList.toggle( "bg-white" );
            ele.classList.toggle( "text-dark" );
        } );
    }

    setTimeout( () =>
    {
        const currentSrc = document.querySelector( "#themeLogo" ).getAttribute( "src" );
        const newSrc = currentSrc === "imgs/icon-moon.svg" ? "imgs/icon-sun.svg" : "imgs/icon-moon.svg";
        document.querySelector( "#themeLogo" ).src = newSrc;
    }, 160 ); // Change the delay time as needed to match the transition duration in CSS
}

