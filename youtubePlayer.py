import vlc, pafy, time

def youtubeURL(watchID):
    return f'http://www.youtube.com/watch?v={watchID}'

def main():
    video = pafy.new(youtubeURL('dQw4w9WgXcQ'))
    best = video.getbestaudio()
    media = vlc.MediaPlayer(best.url)
    print('Playing media')
    media.play()
    time.sleep(5)
    media.
    while media.is_playing():
        time.sleep(1)
    

if __name__ == '__main__':
    main()