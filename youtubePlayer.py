import vlc, pafy, time, youtubeSearcher

def youtubeURL(watchID):
    return f'http://www.youtube.com/watch?v={watchID}'

def main():
    video = pafy.new(youtubeURL(youtubeSearcher.search(input('Write name of video: >> '))))
    best = video.getbestaudio()
    media = vlc.MediaPlayer(best.url)
    print('Playing media')
    media.play()
    input('Press enter to stop song')
    media.stop()
    

if __name__ == '__main__':
    while True:
        main()