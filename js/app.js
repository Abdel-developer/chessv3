class piece{
    constructor(){

    }
}
class Board {
    constructor() {

    }
    //pass where you want to display the board 
    displayBoard = (divClass) => {
        let board = document.querySelector(`.${divClass}`)

        for (let i = 1; i < 65; i++) {
            // board.innerHTML = `<div class="sqaure n${i}>test</div>`
            board.innerHTML += `<div class="square n${i}"></div>`
        }
        let squares = [9,16,25,32,41,48,57,64]
        squares.forEach(square => {
            x.colorBoard(square)
        })
        //displaying the pieces
        //there's a problem when you try to not display the pawns...figure out a better way to check for the line breaks 
        // maybe checking if / is next to / and adding a int 8??? 
        // i have to add an int 8 between the // so it adds a second row instead fof skipping the break
        //err while using /// 
        this.displayPieces("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
    }
    //board coloring ... this is goofy asf
    colorBoard = (x) => {
        let on = 0;
        for (let i = x - 8; i < x+1; i++) {
            if (on == 0) {
                document.querySelector(`.n${i}`).classList.add("dark")
                on = 1
            } else if (on == 1) {
                document.querySelector(`.n${i}`).classList.add("light")
                on = 0
            }
        }
    }
    //checking for White pieces 
    isUpperCase = (string) =>{
        return string.toUpperCase() === string;
    }
    //checking for black pieces
    isLowerCase = (string) =>{
        return string.toLowerCase() === string;
    }
    //adding PNGs to the board
    displaySinglePiece = (sqaureNumber, pieceType) =>{
        let piecesArray = ["r","Rook","n","Knight","b","Bishop","q","Queen","k","King", "p","Pawn"]
        //checking if it's white or a black piece 
        let piece = document.querySelector(`.n${sqaureNumber}`)
        if(this.isUpperCase(pieceType)){
            //converting back to lowercase so it knows it's included in the piecesArray 
           let b = pieceType.toLowerCase()

            piece.style.backgroundImage = `url('pieces/w${piecesArray[piecesArray.indexOf(b)+1]}.png')`
            piece.classList.add("activeSquare")
        }else if(this.isLowerCase(pieceType)){
            piece.style.backgroundImage = `url('pieces/b${piecesArray[piecesArray.indexOf(pieceType)+1]}.png')`
            piece.classList.add("activeSquare")
        }
        
    }
    //empty
    clearPieces = ()=>{
        //selecting divs with an active square class only 
        document.querySelectorAll(".activeSquare").forEach(activeSquare=>{
            activeSquare.style.backgroundImage = "url()"
            activeSquare.classList.remove("activeSquare")
        })
    }
    //dispalying every piece using FEN
    displayPieces = (fen)=>{
        this.clearPieces()
        
        let fenArray = fen.replace("//","/8/").split("")
        let index = 1
        for(let i= 1;i < 65;i++){
            
            if(i == fenArray.length+1){
                break
            }else if(parseInt(fenArray[i-1])){
                
                index += parseInt(fenArray[i-1])

            }else if(fenArray[i-1] == "/"){
                //getting current position 
                if(parseInt(fenArray[i-2])){
                    continue
                }else{
                    //figure out a function for this or a way to tell if the value is under a certain breakpoint
                    if(index < 9){
                        let x = 9 - index 
                        index += x
                        
                    }else if(index > 9 && index <  17){
                        let x = 17 - index 
                        index += x
                        
                    }else if(index > 17 && index < 25){
                        let x = 25 - index 
                        index += x
                    }else if(index > 25 && index < 33){
                        let x = 33 - index 
                        index += x
                    }else if(index > 33 && index < 41){
                        let x = 41 - index 
                        index += x
                    }else if(index > 41 && index < 49){
                        let x = 49 - index 
                        index += x
                    }else if(index > 41 && index < 57){
                        let x = 57 - index 
                        index += x
                    }
                }
                
                //figure out a way to this  with a function later 
            }else{
                this.displaySinglePiece(index, fenArray[i-1])
                if(!parseInt(fenArray[i-1])){
                    index+=1
                }
            }
        }
        
       
            
        
    }

    getAlgebraicNotation = (sqaureNumber)=>{
        console.log(sqaureNumber)
    }
    
    handleClick = ()=>{
        let n = document.querySelectorAll(".square")
        n.forEach(square=>{
            
                square.addEventListener("click",()=>{
                    if(!square.classList.value.includes("activeSquare")){
                        return 0
                    }else{
                        let ss =square.style.backgroundImage
                        console.log(ss.substring(ss.indexOf("/")+1,ss.indexOf(".p")))
                        

                    }
                    
                    
                    
                })
            })
            
        
    }



}
let x = new Board()
x.displayBoard("board")

// add this as a function somewhere to the class 

let btn = document.querySelector("button")

btn.addEventListener("click", ()=>{
    let fen = document.querySelector("input")
    
    x.displayPieces(`${fen.value}`)
})

// add custom colors using the constructor maybe??? 

// css later 

//add a way to select pieces using the standard notation 
//convert the squares to algebraic notations 
//create set function maybe????  piece.set("d4") or piece.move("d4","d5")
x.handleClick()

