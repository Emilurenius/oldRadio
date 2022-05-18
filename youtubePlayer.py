import vlc, pafy, time

def youtubeURL(watchID):
    return f'http://www.youtube.com/watch?v={watchID}'

def main():
    video = pafy.new(input('Paste full link of video: >> '))
    best = video.getbestaudio()
    media = vlc.MediaPlayer(best.url)
    print('Playing media')
    media.play()
    input('Press enter to stop song')
    media.stop()
    

if __name__ == '__main__':
    while True:
        main()