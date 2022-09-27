function renderSpawningMask() {
    ctx.fillStyle = 'black'
    ctx.fillRect(gameplayDetails.position.x - 3, 0, gameplayDetails.runwayWidth * 3 + 26, gameplayDetails.position.y - 2)
}

function spawnDisk(id) {
    let columnPosX

    switch (id) {
        case 'red':
            columnPosX = runwayRed.position.x
            break;
        case 'green':
            columnPosX = runwayGreen.position.x
            break;
        case 'blue':
            columnPosX = runwayBlue.position.x
            break;
    }

    let disk = new Disk({
        position: {
            x: columnPosX,
            y: -75
        },
        imageSrc: `./Assets/Images/Disk_${id}.png`,
        id: id
    })

    switch (id) {
        case 'red':
            diskAssembly.red.push(disk)
            break;
        case 'green':
            diskAssembly.green.push(disk)
            break;
        case 'blue':
            diskAssembly.blue.push(disk)
            break;
    }
}

function randomDiskSpawner() {
    setInterval(() => {
        let random = Math.floor(Math.random() * 3)
        let id
        switch (random) {
            case 0:
                id = 'red'
                break;
            case 1:
                id = 'green'
                break;
            case 2:
                id = 'blue'
                break;
        }
        spawnDisk(id)
    }, 4000 / gravity)
}

function diskMissed() {
    console.log('MISS!')
    gameManager.updateStreak('miss')
}

window.addEventListener('keypress', (event) => {
    switch (event.key) {

        // Game Dev buttons
        case '1':
            spawnDisk('red')
            break;
        case '2':
            spawnDisk('green')
            break;
        case '3':
            spawnDisk('blue')
            break;
        case '4':
            setInterval(() => {
                spawnDisk('red')
            }, 4000 / gravity);
            break;
        case '5':
            setInterval(() => {
                spawnDisk('green')
            }, 4000 / gravity);
            break;
        case '6':
            setInterval(() => {
                spawnDisk('blue')
            }, 4000 / gravity);
            break;
        case '0':
            randomDiskSpawner()
            break;

        // Regular Game Buttons
        case 'a':
            if (diskAssembly.red.length === 0) {
                diskMissed()
            } else {
                diskAssembly.red[0].detonate()
            }
            break;
        case 's':
            if (diskAssembly.green.length === 0) {
                diskMissed()
            } else {
                diskAssembly.green[0].detonate()
            }
            break;
        case 'd':
            if (diskAssembly.blue.length === 0) {
                diskMissed()
            } else {
                diskAssembly.blue[0].detonate()
            }
            break;
    }
})