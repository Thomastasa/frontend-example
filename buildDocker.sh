
function heading() {
    echo ""
    echo "===================="
    for line in "$@"; do
        echo "$line"
    done
    echo "===================="
    echo ""
}


heading "Building Docker Image"

docker-compose build --no-cache

heading "Docker Image Built"
