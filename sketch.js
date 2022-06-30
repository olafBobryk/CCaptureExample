let img;
let grid =  [];

function preload(){
	img = loadImage("sculpt.jpg");
}
function setup() {
	createCanvas(img.width * 2,img.height * 2);
	background(0);
	img.resize(width, height);
	
	
	img.loadPixels();
	loadPixels();
	
	for(x = 0; x < width; x ++){
		grid[x] = [];
		for(y = 0; y < height; y ++){
			let index = (x + y * width) * 4;
			let red = img.pixels[index];
			let green = img.pixels[index + 1];
			let blue = img.pixels[index + 2];
			let b = (red + green + blue) / 3 / 255;
			grid[x][y] = b
			
			
		}
	}
	updatePixels();
	img.updatePixels();
}

function draw() {

    if(frameCount === 1){
        capturer.start()
    
    }


	loadPixels();
	
	
	for(let x = 0; x < width; x ++){
		for(let y = 0; y < height; y ++){
			let b = grid[x][y];
			let index = (x + y * width) * 4;
			b += noise(x / 1000,y / 1000,frameCount / 500)
			let n = b * 3 + frameCount / 200;
			
			
			let x1 = x + cos(n * TWO_PI  + frameCount / 120) *n* 10
			let y1 = y + sin(n * TWO_PI + frameCount / 120) *(n)* 10;
			
			let d = dist(0,0,x1,y1) / 100;
			
			
			
			pixels[index] = 192 + cos(floor(d * 10) / 10* TWO_PI) * 100;
			pixels[index + 1] = 143;
			pixels[index + 2] = 245  + sin(floor(d * 5) / 5* TWO_PI) * 50;
		}
	}
	
	updatePixels();

	

	if(frameCount < 1800){
		capturer.capture(canvas);
	}else if (frameCount === 1800){
		capturer.save()
		capturer.stop()
	}


}
