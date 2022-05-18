def search(searchTerms) :
    from youtube_search import YoutubeSearch

    # results = YoutubeSearch(f'{searchTerms}', max_results=10).to_json()

    # print(results.videos[0].id)

    # returns a json string

    ########################################

    results = YoutubeSearch(searchTerms, max_results=10).to_dict()

    return results[0]['id']

if __name__ == '__main__':
    print('This script is a library, and should not be used directly. Please import into your own project.')
    print(search(input('>> ')))
